const CapabilityRouter = require("./CapabilityRouter");
const escapeHtml = require("escape-html");
const ValetudoMapSegment = require("../../entities/core/ValetudoMapSegment");

class MapSegmentRenameCapabilityRouter extends CapabilityRouter {
    initRoutes() {
        this.router.put("/", async (req, res) => {
            if (req.body && req.body.action) {
                if (req.body.action === "rename_segment") {
                    if ( req.body.segment_id && req.body.name !== undefined) {
                        try {
                            await this.capability.renameSegment(
                                new ValetudoMapSegment({id: req.body.segment_id}),
                                req.body.name
                            );

                            res.sendStatus(200);
                        } catch (e) {
                            this.sendErrorResponse(req, res, e);
                        }
                    } else {
                        res.status(400).send("Invalid request");
                    }
                } else {
                    res.status(400).send(`Invalid action "${escapeHtml(req.body.action)}" in request body`);
                }
            } else {
                res.status(400).send("Missing action in request body");
            }
        });
    }
}

module.exports = MapSegmentRenameCapabilityRouter;
