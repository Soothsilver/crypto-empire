export default class FailReason {
    static ReceivedUnexpectedData: string = "A participant received unexpected data and terminated the protocol.";
    static ReceivedProperData: string = "You allowed a participant to receive data that you were supposed to withhold from them.";
}