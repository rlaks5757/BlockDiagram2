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
        `${oracle.url2}/${req.params.id}`,
        {
          options: {
            bpname: req.body.bpName,
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

      console.log(comAxios.data.data);

      await res.status(201).json({
        success: true,
        data: comAxios.data,
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
      `${oracle.url2}/${req.params.id}`,
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

    console.log(comAxios.data);

    await res.status(201).json({
      success: true,
      data: comAxios.data,
    });
  } catch (err) {
    res.status(400).json({ success: false, data: err });
  }
});

router.route("/new/:id").post(async (req, res) => {
  try {
    const comAxios = await axios.post(
      `${oracle.url2}/${req.params.id}`,
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

    await res.status(201).json({
      success: true,
      data: comAxios.data,
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
