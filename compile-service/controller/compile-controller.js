import { compileRequest, getCompileResponse } from "./compileRequest.js";

export const submitCompileRequest = async (req, res) => {
  try {
    const { lang, memory_limit, time_limit, source, input } = req.body;
    const result = await compileRequest(
      lang,
      memory_limit,
      time_limit,
      source,
      input
    )
      .then((res) => res.data.status_update_url)
      .catch((err) => res.status(400).json({ message: err }));
    res.status(200).json({ resultUrl: result });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Submit Compile Request Failed. Error ${err}` });
  }
};

export const getCompileResult = async (req, res) => {
  try {
    
    const { url } = req.body;
    if (url) {
      const result = await getCompileResponse(url)
      return res.status(200).send(result);
    }
    return res.status(400).json({ message: "Please provide a url." });
  } catch (err) {
    return res.status(500).json({ message: `${err}` });
  }
};
