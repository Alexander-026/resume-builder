// pdf.js worker bundle ships without typings; it is imported only for its side
// effect (sets globalThis.pdfjsWorker so pdf.js runs on the main thread).
declare module "pdfjs-dist/legacy/build/pdf.worker.mjs"
