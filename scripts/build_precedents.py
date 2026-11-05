"""Build Word (.docx) versions of the precedent letters in lessons.js.

Usage:
  node scripts/extract_precedents.js > /tmp/prec.json
  python3 scripts/build_precedents.py /tmp/prec.json

Writes assets/precedents/<Title>.docx in Arial 11 on the firm letterhead (assets/letterhead.docx).
"""
import json, re, sys, os
from docx import Document
from docx.shared import Pt, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "precedents")
LOGO = os.path.join(ROOT, "assets", "logo.png")

NUM = re.compile(r"^(\d+)\.\s+(.*)$")
SUB = re.compile(r"^\s+(\([a-z]\))\s+(.*)$")


def parse(text):
    """Turn the fixed-width template into blocks: (kind, label, text)."""
    blocks, cur = [], None
    for raw in text.split("\n"):
        if not raw.strip():
            cur = None
            blocks.append(("blank", "", ""))
            continue
        m, s = NUM.match(raw), SUB.match(raw)
        if m:
            cur = ["num", m.group(1) + ".", m.group(2)]
            blocks.append(cur)
        elif s:
            cur = ["sub", s.group(1), s.group(2)]
            blocks.append(cur)
        elif raw.startswith(" ") and cur is not None:
            cur[2] += " " + raw.strip()
        else:
            cur = None
            blocks.append(["line", "", raw.strip()])
    # collapse repeated blanks
    out = []
    for b in blocks:
        if b[0] == "blank" and out and out[-1][0] == "blank":
            continue
        out.append(tuple(b))
    return out


def is_heading(t):
    t2 = t.replace("eLITIGATION", "ELITIGATION")
    x = re.sub(r"\[[^\]]*\]", "", t2)
    if not any(c.isalpha() for c in x):
        x = t2
    return any(c.isalpha() for c in x) and x.upper() == x and len(t) > 6


LETTERHEAD = os.path.join(ROOT, "assets", "letterhead.docx")


def arial(run, bold=False):
    run.font.name = "Arial"
    run.font.size = Pt(11)
    run.bold = bold or None
    rpr = run._element.get_or_add_rPr()
    rpr.get_or_add_rFonts().set(qn("w:eastAsia"), "Arial")
    return run


def build(title, text):
    # Start from the firm's letterhead: keep its header tables, header/footer
    # and page setup; replace everything after the letterhead with the letter.
    doc = Document(LETTERHEAD)
    body = doc.element.body
    for el in list(body):
        if el.tag.endswith("}p"):
            body.remove(el)

    def para():
        p = doc.add_paragraph()
        pf = p.paragraph_format
        pf.space_before, pf.space_after = Pt(0), Pt(0)
        pf.line_spacing = 1.15
        return p

    para()  # one blank line under the letterhead
    for kind, label, t in parse(text):
        if kind == "blank":
            arial(para().add_run(""))
            continue
        p = para()
        pf = p.paragraph_format
        if kind in ("num", "sub"):
            ind = 0.5 if kind == "num" else 1.0
            pf.left_indent, pf.first_line_indent = Inches(ind), Inches(-0.5)
            pf.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            pf.tab_stops.add_tab_stop(Inches(ind))
            arial(p.add_run(label + "\t" + t))
        else:
            arial(p.add_run(t), bold=is_heading(t))
    os.makedirs(OUT, exist_ok=True)
    path = os.path.join(OUT, f"Precedent - {title}.docx")
    doc.save(path)
    return path


if __name__ == "__main__":
    for item in json.load(open(sys.argv[1])):
        print(build(item["title"], item["text"]))
