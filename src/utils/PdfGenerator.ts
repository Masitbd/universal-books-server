import handlebars from 'handlebars';
import puppeteer, { PDFOptions } from 'puppeteer';

const GeneratePdf = async <T>({
  templateHtml,
  data,
  options,
}: {
  templateHtml: string;
  data: T;
  options: PDFOptions;
}) => {
  const template = handlebars.compile(templateHtml);
  const finalHtml = encodeURIComponent(template(data));

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`, {
    waitUntil: 'networkidle0',
  });

  const pdfBuffer = await page.pdf(options); // based on = pdf(options?: PDFOptions): Promise<Buffer>; from https://pptr.dev/api/puppeteer.page.pdf pdfBuffer will stored the PDF file Buffer content when "path is not provoded"
  await browser.close();
  return pdfBuffer; // Returning the value when page.pdf promise gets resolved
};

export default GeneratePdf;
