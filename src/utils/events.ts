/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */
import truffleAssert from "truffle-assertions";
import {expect} from "chai";
import {ContractReceipt} from "ethers";

const emitted = (tx: ContractReceipt, eventName: string, assertFunction: any) => {
    const fixedTx = {
        logs: !tx.events
            ? []
            : tx.events.map((event: any) => ({
                  ...event,
                  event: event.event || "",
                  args: event.args || {},
              })),
    };
    truffleAssert.eventEmitted(fixedTx, eventName, (event: any) => {
        assertFunction(event);
        return true;
    });
};

const notEmitted = (tx: ContractReceipt, eventName: string, assertFunction: any) => {
    truffleAssert.eventNotEmitted(tx, eventName, (event: any) => {
        assertFunction(event);
        return true;
    });
};

export default {
    lootPortal: {
        retryableTicketCreated: (tx: ContractReceipt) => {
            const eventName = "RetryableTicketCreated";
            return {
                eventName,
                emitted: (
                    ticketId: number,
                ) =>
                    emitted(tx, eventName, (ev: any) => {
                        expect(ev.ticketId, "Ticket ID should be equal.").to.be.eq(ticketId);
                    }),
                notEmitted: (assertFunction = () => {}) =>
                    notEmitted(tx, eventName, assertFunction),
            };
        },
    },
};
