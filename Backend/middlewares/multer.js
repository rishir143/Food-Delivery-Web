import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "/public");
  },
  filename: (req, file, cd) => {
    cd(file.originalname);
  },
});
export const upload = multer({ storage });
