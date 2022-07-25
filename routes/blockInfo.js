const express = require("express");
const axios = require("axios");

const router = express.Router();

const oracle = require("../oracle");

console.log(oracle);

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
        `${oracle.url}/${req.params.id}`,
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
      //   topBody,
      //   {
      //     headers: headerKey,
      //   }
      // );

      console.log(comAxios);
      await res.status(201).json({
        success: true,
        data: deleteComBody,
      });
    } catch (err) {
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
      `${oracle.url}/${req.params.id}`,
      {
        options: {
          bpname: "Commissioning Activities",
          LineItemIdentifier: "dtsLineAutoSeq",
        },
        data: req.body,
      },

      {
        headers: oracle.headers,
      }
    );

    // const topAxios = await axios.post(
    //   `https://unifier.dtsolution.kr/ws/rest/service/v1/bp/records/${req.params.id}`,
    //   topBody,
    //   {
    //     headers: headerKey,
    //   }
    // );

    await res.status(201).json({
      success: true,
      data: comAxios,
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
  bpname: "Top Activities",
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
