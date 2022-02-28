import { RequestHandlerAPI } from "@app/controllers/types";

const ContentType: RequestHandlerAPI = (_, resp, next) => {
  resp.contentType("application/json; charset=utf-8");
  next();
};

export default ContentType;
