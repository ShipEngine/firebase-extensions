"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddress = void 0;
const functions = require("firebase-functions");
const shipengine_1 = require("shipengine");
const config_1 = require("./config");
const logs = require("./logs");
// Initialize ShipEngine client
const shipEngine = new shipengine_1.default(config_1.default.shipEngineApiKey);
logs.init();
exports.validateAddress = functions.handler.firestore.document.onWrite(async (change) => {
    logs.start();
    const data = change.after.data();
    const address = data[config_1.default.addressKey];
    if (!address) {
        logs.addressMissing();
    }
    const params = [address];
    let update;
    /**
     * Validate Address
     */
    try {
        logs.addressValidating();
        // fetch validated address
        const [result] = await shipEngine.validateAddresses(params);
        // Build node update based on the result status
        update = { status: result.status };
        switch (update.status) {
            case 'verified':
                update.normalizedAddress = result.normalizedAddress;
                break;
            case 'warning':
                update.normalizedAddress = result.normalizedAddress;
            case 'unverified':
            case 'error':
                update.messages = result.messages;
                break;
        }
    }
    catch (err) {
        logs.errorValidateAddress(err);
        return;
    }
    logs.addressValidated(update);
    /**
     * Update Reference
     */
    try {
        logs.parentUpdating();
        change.after.ref.update(update);
        logs.parentUpdated();
    }
    catch (err) {
        logs.errorUpdatingParent(err);
        return;
    }
});
//# sourceMappingURL=index.js.map