/**
 * Copyright © 2024, F2FINTECH. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of F2FINTECH., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with F2 FINTECH.
 */

const Utility = require("../../utility");
const QueryModel = require("../../model/query");

const QueryController = {
    createQuery: (req, res) => {
        const payload = req.body;

        return new Promise((resolve, reject) => {
            QueryModel.create(payload)
                .then((result) => {
                    resolve(res.status(200).send(Utility.formatResponse(200, result)));
                })
                .catch((err) => {
                    reject(res.status(500).send(Utility.formatResponse(500, err)));
                });
        });
    },

    getQueries: (req, res) => {
        const { limit = 10, offset = 0, customer_id } = req.query;
        return new Promise((resolve, reject) => {
            const where = customer_id ? { customer_id: customer_id } : {};
            QueryModel.findAndCountAll({
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
                        resolve(res.status(200).send(Utility.formatResponse(200, rows,)));
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

    updateQuery: (req, res) => {
        const { id } = req.params;
        const payload = req.body;

        return new Promise((resolve, reject) => {
            QueryModel.update(payload, {
                where: { id: id },
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

module.exports = QueryController;
