/**
 * ============================================================
 *  SCORM Builder Script
 *  Genera automáticamente un paquete SCORM 1.2 (.zip)
 * ============================================================
 */

const fs = require("fs-extra");
const path = require("path");
const archiver = require("archiver");

// ===============================
// CONFIGURACIÓN DEL CURSO
// ===============================

const COURSE_ID = "curso-ley1257";
const COURSE_TITLE = "Curso Ley 1257 - No Violencia contra la Mujer";
const ENTRY_FILE = "index.html";

const OUTPUT_DIR = "dist";
const OUTPUT_ZIP = `${COURSE_ID}-scorm.zip`;

// ===============================
// GENERAR IMS MANIFEST
// ===============================

function generateManifest() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${COURSE_ID}"
          version="1.0"
          xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
          xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2">

  <organizations default="ORG1">
    <organization identifier="ORG1">
      <title>${COURSE_TITLE}</title>

      <item identifier="ITEM1" identifierref="RESOURCE1">
        <title>${COURSE_TITLE}</title>
      </item>

    </organization>
  </organizations>

  <resources>
    <resource identifier="RESOURCE1"
              type="webcontent"
              adlcp:scormtype="sco"
              href="${ENTRY_FILE}">
      <file href="${ENTRY_FILE}"/>
    </resource>
  </resources>

</manifest>`;
}

// ===============================
// CREAR ZIP
// ===============================

async function buildScormPackage() {
    try {
        console.log("📦 Generando paquete SCORM...");

        // Crear carpeta dist si no existe
        await fs.ensureDir(OUTPUT_DIR);

        const outputPath = path.join(OUTPUT_DIR, OUTPUT_ZIP);
        const output = fs.createWriteStream(outputPath);
        const archive = archiver("zip", { zlib: { level: 9 } });

        archive.pipe(output);

        // 1️⃣ Agregar todos los archivos del proyecto
        archive.glob("**/*", {
            ignore: [
                "node_modules/**",
                "dist/**",
                "build-scorm.js",
                "package.json",
                "package-lock.json"
            ]
        });

        // 2️⃣ Generar dinámicamente el imsmanifest.xml
        archive.append(generateManifest(), { name: "imsmanifest.xml" });

        await archive.finalize();

        console.log("✅ Paquete SCORM generado en:");
        console.log(outputPath);

    } catch (error) {
        console.error("❌ Error generando SCORM:", error);
    }
}

buildScormPackage();
