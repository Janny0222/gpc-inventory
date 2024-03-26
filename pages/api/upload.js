import multer from 'multer';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import csvParser from 'csv-parser'
import fs from 'fs'
import xlsx from 'xlsx'

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads'); // Specify the directory where you want to save the files
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
  }),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseExcel(filePath) {
  const workbook = xlsx.readFile(filePath)
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet, {header: 1})

  const headers = data[0]

  const rows = data.slice(1).map(row => {
    return headers.map((headers, index) => {
      return row[index] || null
    })
  })
  return {headers, rows}
}
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      upload.single('file')(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error uploading file');
        }
        const filePath = req.file.path;
        const {headers, rows} = await parseExcel(filePath)
        console.log(headers)

        const insertQuery = `INSERT INTO lsi_mobile_inventory (${headers.join(', ')}) VALUES ?`;
        const result = await query(insertQuery, [rows]);

        return res.status(200).send('File uploaded successfully');
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      return res.status(500).send('Error uploading file');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
