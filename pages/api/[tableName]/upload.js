import multer from 'multer';
import { query } from '@/lib/db';
import xlsx from 'xlsx'

const upload = multer();

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseExcel(filebuffer) {
  const workbook = xlsx.read(filebuffer, {type : 'buffer'});
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

  const headers = data[0];

  const rows = data.slice(1).map(row => {
    return headers.map((header, index) => {
      // Check if the value is a numeric date (45302 is a common representation for Excel date values)
      if (typeof row[index] === 'number' && row[index] > 1 && row[index] < 50000) {
        // Convert the Excel numeric date value to JavaScript Date object
        const excelDate = new Date((row[index] - 1) * 86400 * 1000);

        excelDate.setFullYear(excelDate.getFullYear() - 70)
        // Format the date as desired, e.g., 'MM-dd-yyyy'
        const formattedDate = excelDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
        
        return formattedDate;
      }
      // Return other values as is
      return row[index];
    });
  });

  return { headers, rows };
}
export default async function handler(req, res) {
  const tableName = req.query.tableName;

  if (req.method === 'POST') {
    try {
      upload.single('file')(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error uploading file');
        }
        const fileBuffer = req.file.buffer;

        try {
          const {headers, rows} = await parseExcel(fileBuffer)
          const insertQuery = `INSERT INTO ${tableName} (${headers.join(', ')}) VALUES ?`;
          const result = await query(insertQuery, [rows]);

        return res.status(200).send('File uploaded successfully');
      } catch (error) {
      console.error('Error uploading file:', error);
      return res.status(500).send('Error uploading file');
        }
      })
  } catch (error){
    console.error('Error uploadig file:', error)
  }
 } else {
    res.status(405).send('Method Not Allowed');
  }
}
