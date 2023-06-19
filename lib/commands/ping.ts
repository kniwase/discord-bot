import { CommandBase } from "../command-base";


/**
 * 実行されたら「pong!」と返す
 */
class Ping extends CommandBase {
    constructor() {
        super();
        this.name = 'ping';
        this.description = '`ping`: let\'s play pingpong!';
    }
    /**
     * @param  {...string} args 
     */
    exec(...args) {
        return 'pong!';
    }
}

export default Ping;
