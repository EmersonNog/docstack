import {
  Document,
  Packer,
  Paragraph,
  ImageRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  TextRun,
  VerticalAlign,
  BorderStyle,
  TableLayoutType,
  Header,
  Footer,
} from "docx";

const SUPPORTED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/bmp"];

const typeMap: Record<string, "jpg" | "png" | "gif" | "bmp"> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/bmp": "bmp",
};

// Utilitário para gerar uma tabela de logomarcas em linha
async function buildLogoTable(files: File[]) {
  const cells = await Promise.all(
    files.map(async (file) => {
      const image = new ImageRun({
        data: await file.arrayBuffer(),
        transformation: { width: 100, height: 50 },
        type: typeMap[file.type],
      });

      return new TableCell({
        children: [
          new Paragraph({
            children: [image],
            alignment: AlignmentType.CENTER,
          }),
        ],
        width: { size: 100 / files.length, type: WidthType.PERCENTAGE },
        verticalAlign: VerticalAlign.CENTER,
        borders: {
          top: { size: 0, style: BorderStyle.NONE, color: "FFFFFF" },
          bottom: { size: 0, style: BorderStyle.NONE, color: "FFFFFF" },
          left: { size: 0, style: BorderStyle.NONE, color: "FFFFFF" },
          right: { size: 0, style: BorderStyle.NONE, color: "FFFFFF" },
        },
      });
    })
  );

  return [
    new Table({
      layout: TableLayoutType.FIXED,
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: [new TableRow({ children: cells })],
      borders: {
        top: { size: 0, style: BorderStyle.NONE, color: "FFFFFF" },
        bottom: { size: 0, style: BorderStyle.NONE, color: "FFFFFF" },
        left: { size: 0, style: BorderStyle.NONE, color: "FFFFFF" },
        right: { size: 0, style: BorderStyle.NONE, color: "FFFFFF" },
        insideHorizontal: { size: 0, style: BorderStyle.NONE, color: "FFFFFF" },
        insideVertical: { size: 0, style: BorderStyle.NONE, color: "FFFFFF" },
      },
    }),
    new Paragraph({
      spacing: { after: 20 },
    }),
  ];
}

export async function generateDocx(
  images: File[],
  fonte: string,
  headerLogos: File[],
  footerLogos: File[]
) {
  const validImages = images.filter((img) =>
    SUPPORTED_TYPES.includes(img.type)
  );
  const sections = [];
  let figuraCount = 1;

  const header =
    headerLogos.length > 0
      ? new Header({
          children: await buildLogoTable(headerLogos),
        })
      : undefined;

  const footer =
    footerLogos.length > 0
      ? new Footer({
          children: await buildLogoTable(headerLogos),
        })
      : undefined;

  for (let i = 0; i < validImages.length; i += 6) {
    const group = validImages.slice(i, i + 6);

    const imageCells = await Promise.all(
      group.map(async (img) => {
        const arrayBuffer = await img.arrayBuffer();

        const imageRun = new ImageRun({
          data: arrayBuffer,
          transformation: {
            width: 300,
            height: 180,
          },
          type: typeMap[img.type],
        });

        const innerTable = new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          layout: TableLayoutType.FIXED,
          borders: {
            top: { size: 0, color: "FFFFFF", style: BorderStyle.NONE },
            bottom: { size: 0, color: "FFFFFF", style: BorderStyle.NONE },
            left: { size: 0, color: "FFFFFF", style: BorderStyle.NONE },
            right: { size: 0, color: "FFFFFF", style: BorderStyle.NONE },
            insideHorizontal: {
              size: 0,
              color: "FFFFFF",
              style: BorderStyle.NONE,
            },
            insideVertical: {
              size: 0,
              color: "FFFFFF",
              style: BorderStyle.NONE,
            },
          },

          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: `Figura ${figuraCount++} - ${img.name}`,
                          bold: true,
                          size: 20,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                    }),
                  ],
                  verticalAlign: VerticalAlign.CENTER,
                }),
              ],
              height: { value: 500, rule: "exact" },
            }),

            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [imageRun],
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 20 },
                    }),
                  ],
                  verticalAlign: VerticalAlign.CENTER,
                }),
              ],
              height: { value: 1500, rule: "atLeast" },
            }),

            new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: `Fonte: ${fonte}`,
                          italics: true,
                          size: 18,
                        }),
                      ],
                      alignment: AlignmentType.CENTER,
                      spacing: { after: 5 },
                    }),
                  ],
                  verticalAlign: VerticalAlign.TOP,
                }),
              ],
              height: { value: 300, rule: "exact" },
            }),
          ],
        });

        return new TableCell({
          children: [new Paragraph({ spacing: { after: 10 } }), innerTable],
          width: { size: 50, type: WidthType.PERCENTAGE },
          verticalAlign: VerticalAlign.TOP,
        });
      })
    );

    while (imageCells.length < 6) {
      imageCells.push(
        new TableCell({
          children: [new Paragraph("")],
          width: { size: 50, type: WidthType.PERCENTAGE },
        })
      );
    }

    const table = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      layout: TableLayoutType.FIXED,
      rows: [
        new TableRow({ children: imageCells.slice(0, 2) }),
        new TableRow({ children: imageCells.slice(2, 4) }),
        new TableRow({ children: imageCells.slice(4, 6) }),
      ],
      borders: {
        top: { size: 1, color: "000000", style: BorderStyle.NONE },
        bottom: { size: 1, color: "000000", style: BorderStyle.NONE },
        left: { size: 1, color: "000000", style: BorderStyle.NONE },
        right: { size: 1, color: "000000", style: BorderStyle.NONE },
        insideHorizontal: {
          size: 0,
          color: "FFFFFF",
          style: BorderStyle.NONE,
        },
        insideVertical: {
          size: 0,
          color: "FFFFFF",
          style: BorderStyle.NONE,
        },
      },
    });

    sections.push({
      properties: {},
      headers: header ? { default: header } : {},
      footers: footer ? { default: footer } : {},
      children: [table],
    });
  }

  const doc = new Document({
    sections,
  });

  const blob = await Packer.toBlob(doc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "relatorio_fotografico.docx";
  link.click();
  return blob;
}
