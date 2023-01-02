import express from "express";
import multer from "multer";
import path from "path";
import File from "../Models/File";
import fs from "fs";

// INIT MIDDLEWARE
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function (req: any, file: any, cb: any): void {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });
// END MIDDLEWARE

const router = express.Router();

router.get("/files", async (req, res) => {
  const files = await File.findAll();
  res.json({ data: files, error: false });
});

router.post("/files", upload.single("file"), async (req, res) => {
  const resFile = req.file;

  const file = File.build({
    nombre: resFile?.originalname,
    ruta: resFile?.path,
  });

  try {
    if (!resFile) throw new Error("No existe archivo");

    await file.save();
    res.json({
      data: "Archivo guardado correctamente",
      error: false,
      ruta: path.resolve(resFile?.path || "")?.replace(/\\/g, "/"),
    });
  } catch (error) {
    res.json({
      data: "Error al guardar archivo",
      error,
    });
  }
});

router.post("/files/:id", async (req, res) => {
  const { id } = req.params;
  const { pubId } = req.body;

  const file = await File.findOne({ where: { id } });

  if (file) {
    const newFile = { ...file, idFkPub: pubId };
    await File.update(newFile, { where: { id } });

    res.json({ data: newFile, error: false });
  } else {
    res.json({ data: {}, error: true });
  }
});

router.get("/files/download/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const file = (await File.findOne({ where: { id } })) as unknown as {
      ruta: string;
      nombre: string;
    };

    const buildFile = fs.createReadStream(file.ruta);
    const filename = file?.nombre || new Date().toISOString();
    res.setHeader(
      "Content-Disposition",
      'attachment: filename="' + filename + '"'
    );
    buildFile.pipe(res);
  } catch (error) {
    res.json({ error: true, data: error });
  }
});

export default router;
