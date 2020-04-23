class FileController {
  static async store(req, res) {
    try {
      const { originalname: name, filename: path } = req.file;

      return res.json({ name, path });
    } catch ({ message }) {
      return res.status(501).json({ error: message });
    }
  }
}

export default FileController;
