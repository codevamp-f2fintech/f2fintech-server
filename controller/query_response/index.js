/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const Utility = require("../../utility");
const QueryResponseModel = require("../../model/query_response");

const QueryResponseController = {
    createQueryResponse: (req, res) => {
        const payload = req.body;

        return new Promise((resolve, reject) => {
            QueryResponseModel.create(payload)
                .then((result) => {
                    resolve(res.status(200).send(Utility.formatResponse(200, result)));
                })
                .catch((err) => {
                    console.log('err', err)
                    reject(res.status(500).send(Utility.formatResponse(500, err)));
                });
        });
    },

    getQueryResponse: (req, res) => {
        const { limit = 10, offset = 0, query_id } = req.query;
        return new Promise((resolve, reject) => {
            const where = query_id ? { query_id: query_id } : {};
            QueryResponseModel.findAndCountAll({
                where: where,
                order: [
                    ['created_at', 'DESC'],
                ],
                limit: parseInt(limit),
                offset: parseInt(offset),
            })
                .then((list) => {
                    const { count, rows } = list;
                    if (count > 0) {
                        resolve(res.status(200).send(Utility.formatResponse(200, rows.reverse(), count)));

                    } else {
                        resolve(
                            res.status(404).send(Utility.formatResponse(404, "No Data Found"))
                        );
                    }
                })
                .catch((err) => {
                    reject(
                        res.status(500).send(Utility.formatResponse(500, err.message))
                    );
                });
        });
    },

    updateQueryResponse: (req, res) => {
        const payload = req.body;
        console.log(payload, "payload")

        return new Promise((resolve, reject) => {
            QueryResponseModel.update(payload, {
                where: { id: payload.id },
            })
                .then((result) => {
                    if (result[0] === 0) {
                        resolve(
                            res.status(404).send(Utility.formatResponse(404, "No Data Found"))
                        );
                    } else {
                        resolve(
                            res.status(200).send(Utility.formatResponse(200, "Update Successful"))
                        );
                    }
                })
                .catch((err) => {
                    reject(res.status(500).send(Utility.formatResponse(500, err)));
                });
        });
    },

};

module.exports = QueryResponseController;
