const CompanyInfo = require("../model/Company.schema");

/**
 * @type GET
 * @path http:localhost:4000/Search/:str
 * @description  This Searching Queary can Search data based on
 *  Half info or full info's with bypassing capitalize or smaller case Entery
 * @param {*} req - request hold the String value to search quary
 * @param {*} res - Success, message data
 * @returns   -
 */
const Searching = async (req, res) => {
  const str = req.params.str;
  console.log(str);
  if (!str) {
    return res.status(401).json({
      Success: false,
      Message: "String is not passed",
    });
  }

  try {
    const data = await CompanyInfo.find({
      /**
       * We are using Regex and $in  because one is checking if any String contains's the
       *  { String } given or other for  bypassing any type of  capitalization or smaller case
       * scenario
       */
      $or: [
        { company_name: { $in: [str] } },
        { primary_text: { $in: [str] } },
        { Headline: { $in: [str] } },
        { desciption: { $in: [str] } },
        { company_name: { $regex: `^${str}`, $options: "i" } },
        { primary_text: { $regex: `^${str}`, $options: "i" } },
        { Headline: { $regex: `^${str}`, $options: "i" } },
        { desciption: { $regex: `^${str}`, $options: "i" } },
      ],
    });
    console.log(data);
    if (data.length == 0) {
      return res.status(401).json({
        Success: false,
        Message: "data is not found",
      });
    }

    console.log(data);
    res.status(200).json({
      Success: true,
      message: "datahas been found",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      Success: false,
      message: "Erore",
    });
  }
};

/**
 * @type POST
 * @path http:localhost:4000/companycreate
 * @description  Creating Company using data which will be provided
 * @param {*} req - requestion hold the _id    _id,
    companyId,
    CTA,
    imageUrl,
    url,
    company_name,
    primary_text,
    Headline,
    desciption,
 * @param {*} res - Success, message , CompanyCreated
 * @returns   -
 */

const Createcompany = async (req, res) => {
  const {
    _id,
    companyId,
    CTA,
    imageUrl,
    url,
    company_name,
    primary_text,
    Headline,
    desciption,
  } = req.body;
  if (
    !_id ||
    !companyId ||
    !CTA ||
    !imageUrl ||
    !url ||
    !company_name ||
    !primary_text ||
    !Headline ||
    !desciption
  ) {
    return res.status(400).json({
      success: false,
      Message: "All info should be given to create a company",
      CheckUndefined: {
        _id: !!_id,
        companyId: !!companyId,
        CTA: !!CTA,
        imageUrl: !!imageUrl,
        url: !!url,
        company_name: !!company_name,
        primary_text: !!primary_text,
        Headline: !!Headline,
        desciption: !!desciption,
      },
    });
  }

  try {
    //trying to create new Data here
    const CreatedTodo = await CompanyInfo.create({
      _id,
      companyId,
      CTA,
      imageUrl,
      url,
      company_name,
      primary_text,
      Headline,
      desciption,
    });

    res.status(200).json({
      Success: true,
      Message: "Todo has been Created",
      CompanyCreated: CreatedTodo,
    });
  } catch (error) {
    // duplication of data with same title

    if (error.index == 0) {
      return res.status(401).json({
        success: false,
        message: "Company with Same Id Already Exists",
      });
    }
    console.log(error);

    // Title has been not pass

    // Handling some other Error by this
    res.status(402).json({
      Success: false,
      Error: "some Error has been occured Please try Again Later",
    });
  }
};

module.exports = { Searching, Createcompany };
