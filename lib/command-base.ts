export type MessageProps = {
    readonly user: { id: string, name: string };
    readonly messageId: string, 
    readonly referenceMessageID: string | null;
    readonly content: string;
};
export type CommandContext = MessageProps & {
    readonly args: string[];
    readonly getMessage: (messageId: string) => Promise<MessageProps | undefined>;
};
export type ReplyMessageProps = {
    updateReplyMessage: (content: string) => Promise<void>;
    replyMessageId: string;
};
export type CommandHandler = (
    sendReplyMessage: (content: string) => Promise<ReplyMessageProps>,
    ctx: CommandContext
) => any | Promise<any>;
export type CommandResponse = string | CommandHandler;

/**
 * コマンドの基底クラス
 */
export abstract class CommandBase {
    /** コマンドの名前、呼び出し時はこの名前を使う */
    name = 'command-name';

    /** コマンドの説明、ヘルプとかで表示する */
    description = 'command-description';

    /**
     * 関数の実装部
     */
    abstract exec(...args: string[]): CommandResponse | Promise<CommandResponse>;
}
