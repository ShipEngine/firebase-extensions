"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddress = void 0;
const functions = require("firebase-functions");
const firebase_functions_1 = require("firebase-functions");
const shipengine_1 = require("shipengine");
// Init ShipEngine js
let shipengine;
try {
    firebase_functions_1.logger.log('Init shipengine');
    shipengine = new shipengine_1.default(process.env.SHIPENGINE_API_KEY);
}
catch (err) {
    firebase_functions_1.logger.error(err);
}
exports.validateAddress = functions.handler.firestore.document.onWrite(async (change) => {
    const data = change.after.data();
    const params = [data.address];
    const ref = change.after.ref;
    firebase_functions_1.logger.info(data);
    if (!data.address) {
        firebase_functions_1.logger.error('Address data missing');
    }
    let result;
    let update;
    /**
     * Validate Address
     */
    try {
        // logs.addressValidating();
        // fetch validated address
        [result] = await shipengine.validateAddresses(params);
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
        // Log fatal error
        firebase_functions_1.logger.error('Error validating address', err);
        return;
    }
    /**
     * Update Reference
     */
    try {
        // logs.parentUpdating();
        const updateResult = ref.update(update);
        firebase_functions_1.logger.info('Document updated: ', updateResult);
    }
    catch (err) {
        firebase_functions_1.logger.error(err);
        return;
    }
});
//# sourceMappingURL=index.js.map