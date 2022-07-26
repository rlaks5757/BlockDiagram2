const express = require("express");
const axios = require("axios");

const router = express.Router();

const oracle = require("../oracle");

router.route("/:id").get(async (req, res) => {
  try {
    const comAxios = await axios.post(
      `${oracle.url}/${req.params.id}`,
      comBody,
      {
        headers: oracle.headers,
      }
    );

    const topAxios = await axios.post(
      `${oracle.url}/${req.params.id}`,
      topBody,
      {
        headers: oracle.headers,
      }
    );

    await res.status(201).json({
      success: true,
      com: comAxios.data.data,
      top: topAxios.data.data,
    });
  } catch (err) {
    res.status(400).json({ success: false, data: err });
  }
});

router.route("/delete/:id").post(async (req, res) => {
  try {
    try {
      const comAxios = await axios.put(
        `https://unifier.dtsolution.kr/ws/rest/service/v1/bp/record/${req.params.id}`,
        {
          options: {
            bpname: "Commissioning Activities",
            LineItemIdentifier: "dtsLineAutoSeq",
          },
          data: [
            {
              _delete_bp_lineitems: req.body._bp_lineitems,
              record_no: req.body.record_no,
            },
          ],
        },
        {
          headers: oracle.headers,
        }
      );

      // const topAxios = await axios.post(
      //   `https://unifier.dtsolution.kr/ws/rest/service/v1/bp/records/${req.params.id}`,
      //   comBody,
      //   {
      //     headers: {
      //       Authorization:
      //         "Bearer eyJ0eXAiOiJEQiJ9.eyJ1c2VybmFtZSI6IiQkcDYifQ==.592E63E4-05BF-7B12-7D05-0A2B031A0EEF091C12AAE846910A7624C1F6FE485D19",
      //     },
      //   }
      // );
      console.log(comAxios.data.data);

      await res.status(201).json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ success: false, data: err });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, data: err });
  }
});
router.route("/fixed/:id").post(async (req, res) => {
  try {
    const comAxios = await axios.put(
      `https://unifier.dtsolution.kr/ws/rest/service/v1/bp/record/${req.params.id}`,
      {
        options: {
          bpname: req.body.bpName,
          LineItemIdentifier: "dtsLineAutoSeq",
        },
        data: [req.body.data],
      },
      {
        headers: oracle.headers,
      }
    );
    console.log(req.body);
    console.log(comAxios.data);

    // const topAxios = await axios.post(
    //   `https://unifier.dtsolution.kr/ws/rest/service/v1/bp/records/${req.params.id}`,
    //   topBody,
    //   {
    //     headers: headerKey,
    //   }
    // );

    await res.status(201).json({
      success: true,
      com: comAxios.data.data,
    });
  } catch (err) {
    res.status(400).json({ success: false, data: err });
  }
});

router.route("/new/:id").post(async (req, res) => {
  try {
    const comAxios = await axios.post(
      `https://unifier.dtsolution.kr/ws/rest/service/v1/bp/record/${req.params.id}`,
      {
        options: {
          bpname: req.body.bpName,
          LineItemIdentifier: "dtsLineAutoSeq",
        },
        data: [req.body.data],
      },
      {
        headers: oracle.headers,
      }
    );

    console.log(req.body);
    console.log(comAxios);

    // console.log(comAxios.data);

    // const topAxios = await axios.post(
    //   `https://unifier.dtsolution.kr/ws/rest/service/v1/bp/records/${req.params.id}`,
    //   topBody,
    //   {
    //     headers: headerKey,
    //   }
    // );

    await res.status(201).json({
      success: true,
      com: comAxios.data.data,
    });
  } catch (err) {
    res.status(400).json({ success: false, data: err });
  }
});

module.exports = router;

const comBody = {
  bpname: "Commissioning Activities",
  filter_criteria: {
    join: "AND",
    filter: [
      {
        field: "uuu_P6ActivityId",
        value: null,
        condition_type: "neq",
      },
    ],
  },
};

const topBody = {
  bpname: "Turnover Packages",
  filter_criteria: {
    join: "AND",
    filter: [
      {
        field: "dtsTOPCode",
        value: null,
        condition_type: "neq",
      },
    ],
  },
};
