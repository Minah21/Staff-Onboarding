"""Build Word (.docx) versions of the precedent letters in lessons.js.

Usage:
  node scripts/extract_precedents.js > /tmp/prec.json
  python3 scripts/build_precedents.py /tmp/prec.json

Writes assets/precedents/<Title>.docx in Arial 11 with the firm logo in the header.
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
    letters = re.sub(r"\[[^\]]*\]", "", t)
    return any(c.isalpha() for c in letters) and letters.upper() == letters and len(t) > 6


def build(title, text):
    doc = Document()
    st = doc.styles["Normal"]
    st.font.name = "Arial"
    st.font.size = Pt(11)
    st.element.rPr.rFonts.set(qn("w:eastAsia"), "Arial")
    st.paragraph_format.space_after = Pt(0)
    st.paragraph_format.line_spacing = 1.15
    sec = doc.sections[0]
    sec.page_width, sec.page_height = Inches(8.27), Inches(11.69)  # A4
    for side in ("left_margin", "right_margin"):
        setattr(sec, side, Inches(1))
    sec.top_margin, sec.bottom_margin = Inches(0.8), Inches(1)
    hp = sec.header.paragraphs[0]
    hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    hp.add_run().add_picture(LOGO, width=Inches(1.6))

    for kind, label, t in parse(text):
        if kind == "blank":
            doc.add_paragraph()
            continue
        p = doc.add_paragraph()
        pf = p.paragraph_format
        if kind == "num":
            pf.left_indent, pf.first_line_indent = Inches(0.5), Inches(-0.5)
            pf.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            pf.tab_stops.add_tab_stop(Inches(0.5))
            p.add_run(label + "\t" + t)
        elif kind == "sub":
            pf.left_indent, pf.first_line_indent = Inches(1.0), Inches(-0.5)
            pf.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
            pf.tab_stops.add_tab_stop(Inches(1.0))
            p.add_run(label + "\t" + t)
        else:
            r = p.add_run(t)
            if is_heading(t):
                r.bold = True
    os.makedirs(OUT, exist_ok=True)
    path = os.path.join(OUT, f"Precedent - {title}.docx")
    doc.save(path)
    return path


if __name__ == "__main__":
    for item in json.load(open(sys.argv[1])):
        print(build(item["title"], item["text"]))
