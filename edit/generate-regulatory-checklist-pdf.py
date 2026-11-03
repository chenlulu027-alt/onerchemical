"""
Generates: public/downloads/onerchemical-5-market-preservative-compliance-checklist.pdf

Companion to Pillar #3 (preservation-regulations) lead-magnet.
Mirrors the structure/style of Pillar #1 procurement-readiness-checklist.pdf (reportlab, ~3-5 KB).

Run with: python3 generate-regulatory-checklist-pdf.py

Output path: public/downloads/onerchemical-5-market-preservative-compliance-checklist.pdf
"""

from pathlib import Path
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, Color
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak,
)
from reportlab.lib.enums import TA_LEFT

NAVY = HexColor("#0F2D6B")
INDIGO = HexColor("#4f46e5")
SLATE = HexColor("#475569")
SLATE_LIGHT = HexColor("#94a3b8")
BORDER = HexColor("#e2e8f0")
AMBER_BG = HexColor("#fffbeb")
AMBER_BORDER = HexColor("#fcd34d")

OUT_DIR = Path(__file__).resolve().parent.parent / "public" / "downloads"
OUT_DIR.mkdir(parents=True, exist_ok=True)
OUT_PATH = OUT_DIR / "onerchemical-5-market-preservative-compliance-checklist.pdf"


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="PillarTitle",
            parent=styles["Title"],
            fontSize=18,
            textColor=NAVY,
            spaceAfter=4,
            alignment=TA_LEFT,
            leading=22,
        )
    )
    styles.add(
        ParagraphStyle(
            name="PillarSubtitle",
            parent=styles["Normal"],
            fontSize=10,
            textColor=SLATE,
            spaceAfter=14,
            alignment=TA_LEFT,
            leading=14,
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionHead",
            parent=styles["Heading2"],
            fontSize=12,
            textColor=INDIGO,
            spaceBefore=12,
            spaceAfter=6,
            leading=16,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ItemBody",
            parent=styles["Normal"],
            fontSize=9.5,
            textColor=HexColor("#1e293b"),
            leading=13,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ItemHint",
            parent=styles["Normal"],
            fontSize=8.5,
            textColor=SLATE,
            leading=11,
            spaceAfter=4,
            leftIndent=14,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Footer",
            parent=styles["Normal"],
            fontSize=8,
            textColor=SLATE_LIGHT,
            leading=11,
            spaceBefore=12,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Preface",
            parent=styles["Normal"],
            fontSize=9.5,
            textColor=HexColor("#1e293b"),
            leading=13,
            spaceAfter=10,
        )
    )
    return styles


SECTION_A = [
    ("A1", "EU CPSR (Cosmetic Product Safety Report) parts A & B assembled and signed by qualified Safety Assessor",
     "Reg (EC) 1223/2009 Art. 10. Required before CPNP notification."),
    ("A2", "EU CPNP (Cosmetic Products Notification Portal) notification complete",
     "Frame formulation + preservative concentration + nanomaterial declaration + child-product tag."),
    ("A3", "US MoCRA facility registration current (biennial renewal from Q1 2026)",
     "Cosmetics Direct portal; foreign facility requires designated US Agent."),
    ("A4", "US MoCRA product listing submitted for each cosmetic SKU distributed",
     "Per 21 USC 364c; update within 60 days of any change."),
    ("A5", "China NMPA 普通化妆品备案 (ordinary cosmetic filing) with full ingredient disclosure",
     "Via 国产普通化妆品备案平台; CoA + Safety Assessment Report attached."),
    ("A6", "Japan quasi-drug approval (if active claim) OR cosmetic notification",
     "Quasi-drug via PMDA requires JSQI 2021 compliance (mandatory from 2026-10-01)."),
    ("A7", "Korea MFDS functional-cosmetic registration (if applicable) OR ordinary cosmetic report",
     "화장품 안전기준 Notice 2026-19; 변경보고 within 15 days of substantive change."),
    ("A8", "6-document stack present per market (CoA / SDS / Challenge Test / allergen declaration / INCI breakdown / change-notification SOP)",
     "See Section 5 of the Pillar #3 article."),
    ("A9", "Allergen labeling updated for EU 81-allergen rule (full application 2026-07-31)",
     "0.001% leave-on / 0.01% rinse-off trigger."),
    ("A10", "UK post-Brexit dossier maintained separately from EU dossier",
     "UK Cosmetics Regulation SI 2013/1478 as amended; 16 new CMR substances added 2026-08-15."),
]

SECTION_B = [
    ("B1", "Butylparaben: child-product leave-on restriction confirmed (EU Omnibus Act IX, compliance 2027-02-01)",
     "Annex V entry 12a → 12b. Audit all leave-on child SKUs before deadline."),
    ("B2", "Zinc Pyrithione: China prohibition tracking (effective 2028-01-01)",
     "NMPA Announcement No. 6 of 2026. Reformulate China SKUs before deadline."),
    ("B3", "Formaldehyde releasers: EU labeling threshold compliance (0.001% from 2026-07-31)",
     "Reg (EU) 2022/1181. Threshold dropped from 0.05% — audit all SKUs."),
    ("B4", "Methylisothiazolinone: leave-on prohibition confirmed in EU/China/Korea; audit rinse-off/leave-on classification per SKU",
     "Annex V entry 57 (EU); STSC Table 4 serial 51 (CN); MFDS Notice 2026-19 (KR)."),
    ("B5", "Phenoxyethanol: US California Prop 65 1,4-dioxane trace monitoring in place",
     "Supplier CoA must include 1,4-dioxane field; synthesis-byproduct screening quarterly."),
]

SECTION_C = [
    ("C1", "Monthly regulatory horizon scan logged (EU CeWay + US FDA Cosmetics + CN NMPA + JP MHLW + KR MFDS)",
     "Flag every hit against affected product lines; file in supplier dossier."),
    ("C2", "Quarterly supplier dossier review — pull latest CoA + SDS; verify no silent upstream change",
     "Any CoA field drift triggers re-run of Challenge Test and supplier audit scorecard."),
    ("C3", "Challenge Test re-validation scheduled annually per SKU (ISO 11930 / USP <51> / EP 5.1.3 / Japan Pharmacopoeia 4.06)",
     "Budget USD 450-900 per SKU per year; triggered immediately on any formula/supplier/packaging change."),
]


def item_row(idx, label, hint, styles):
    label_para = Paragraph(
        f'<b>{idx}.</b> &nbsp; {label}',
        styles["ItemBody"],
    )
    hint_para = Paragraph(hint, styles["ItemHint"])
    return [label_para, hint_para, Spacer(1, 3)]


def build_pdf():
    doc = SimpleDocTemplate(
        str(OUT_PATH),
        pagesize=LETTER,
        leftMargin=0.75 * inch,
        rightMargin=0.75 * inch,
        topMargin=0.6 * inch,
        bottomMargin=0.6 * inch,
        title="5-Market Preservative Compliance Checklist",
        author="Yang Ruosong, Onerchemical",
        subject="Cosmetic preservative cross-border regulatory compliance",
    )
    styles = build_styles()
    story = []

    story.append(Paragraph("5-Market Preservative Compliance Checklist", styles["PillarTitle"]))
    story.append(
        Paragraph(
            "Onerchemical &middot; Preservation Regulatory Series &middot; As of 2026-11",
            styles["PillarSubtitle"],
        )
    )
    story.append(
        Paragraph(
            "Eighteen items across submission docs, preservative-specific flags, and change-management SOP. "
            "Use this before any cross-border preservative dossier submission or supplier dossier audit. "
            "Each item names the canonical regulatory reference — verify against the regulator&rsquo;s live text, not against this checklist alone.",
            styles["Preface"],
        )
    )

    # Section A
    story.append(Paragraph("Section A &middot; Submission documents (per market)", styles["SectionHead"]))
    for idx, label, hint in SECTION_A:
        story.extend(item_row(idx, label, hint, styles))

    story.append(Spacer(1, 10))
    story.append(Paragraph("Section B &middot; Preservative-specific regulatory flags (2026-11)", styles["SectionHead"]))
    for idx, label, hint in SECTION_B:
        story.extend(item_row(idx, label, hint, styles))

    story.append(Spacer(1, 10))
    story.append(Paragraph("Section C &middot; Change-management SOP (annual cadence)", styles["SectionHead"]))
    for idx, label, hint in SECTION_C:
        story.extend(item_row(idx, label, hint, styles))

    story.append(Spacer(1, 16))
    story.append(
        Paragraph(
            "<b>Companion reading on onerchemical.com:</b><br/>"
            "&bull; <i>Cosmetic Preservative Regulations: 5-Market Compliance Framework</i> &mdash; /guide/preservation-regulations<br/>"
            "&bull; <i>EU Annex V Preservative Compliance Guide</i> &mdash; /blog/eu-annex-v-preservative-compliance-guide<br/>"
            "&bull; <i>Preservative CoA Batch Consistency</i> &mdash; /blog/preservative-coa-batch-consistency<br/>"
            "&bull; <i>ISO 11930 Challenge Test Protocol</i> &mdash; /blog/iso-11930-challenge-test-protocol<br/>"
            "&bull; <i>Preservative Sourcing Pillar</i> &mdash; /guide/preservative-sourcing",
            styles["ItemBody"],
        )
    )

    story.append(
        Paragraph(
            "Prepared by Yang Ruosong, Preservation Regulatory Specialist, Onerchemical. "
            "This checklist is informational guidance, not a substitute for market-specific regulatory counsel. "
            "Regulations change; verify against each regulator&rsquo;s current reference text before submission. "
            "&copy; 2026 Onerchemical.",
            styles["Footer"],
        )
    )

    doc.build(story)
    size_kb = OUT_PATH.stat().st_size / 1024
    print(f"OK  wrote  {OUT_PATH}  ({size_kb:.1f} KB)")


if __name__ == "__main__":
    build_pdf()
