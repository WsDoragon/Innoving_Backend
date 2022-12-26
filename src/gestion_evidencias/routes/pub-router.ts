import express from "express";
import Publication from "../Models/Publication";
import File from "../Models/File";

const router: express.Router = express.Router();

router.get("/pubs", async (_, res) => {
  // const resPublicacion = await query(`select * from publicacion;`);

  const publications = await Publication.findAll();

  res.json({
    data: publications,
    error: null,
  });
});

router.post("/pubs", async (req, res) => {
  const { body } = req;
  if (!body) {
    res.statusCode = 400;
    res.json({ data: [], error: "No existen argumentos" });
  }

  // const { autores, titulo, revista, indexacion, autoresExtranjeros, issnDoi, anio, clasificacion, disciplina } = body;
  const publication = Publication.build(body);

  try {
    await publication.save();
    res.json({
      data: "Correctamente subidos los cambios",
      error: false,
    });
  } catch (error) {
    res.json({
      data: "Error al subir los cambios",
      error,
    });
  }
  // try {
  //   const resInsertPub = await query(
  //     `insert into publicacion
  //     (issn_doi, titulo, autores, revista, autores_extranjeros, indexacion, anio,  clasificacion, disciplina)
  //     values ('${issnDoi}', '${titulo}', '${autores}', '${revista}','${autoresExtranjeros ? 1 : 0}', '${indexacion}', '${anio}','${clasificacion}','${disciplina}');`
  //   );
  //   error = false;

  //   console.log(resInsertPub.affectedRows);
  // } catch (error) {
  //   console.log(error);
  // }
});

router.post("/pubs/update", async (req, res) => {
  const { body } = req;
  if (!body) {
    res.statusCode = 400;
    res.json({ data: [], error: "No existen argumentos" });
  }

  const {
    autores,
    titulo,
    revista,
    indexacion,
    autoresExtranjeros,
    issnDoi,
    anio,
    clasificacion,
    disciplina,
    id,
  } = body;

  try {
    await Publication.update(body, {
      where: {
        id,
      },
    });
    res.json({
      data: "Actualizado correctamente",
      error: false,
    });
  } catch (error) {
    res.json({ data: "Error al actualizar", error });
  }
});

router.get("/pubs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const publication = await Publication.findOne({ where: { id } });

    const files = await File.findAll({ where: { idFkPub: id } });
    console.log(files);
    res.json({
      data: { publication, files },
      error: false,
    });
  } catch (error) {
    res.json({
      data: error,
      error: true,
    });
  }
});

export default router;
