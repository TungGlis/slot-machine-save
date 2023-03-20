import type { MainGame } from '@g/base/MainGame';
import type { SLoading } from '@g/states/SLoading';
import type { SStart } from '@g/states/SStart';


/**
 * Declare some global variables so that they can be accessed everywhere.
 * @note
 * Difference between `env.d.ts` and `global.d.ts` is that the latter containing import/export
 * is turned into module, so things have to be explicity declared in global scope,
 * while the former is just a script, so ambient declarations are permitted.
 */
declare global {
    namespace GlobalMixins {
        interface vbStateMap {
            'Loading': SLoading;
            'Start': SStart;
        }
    }
    
    /**
     * Game Instance Singleton
     * 
     * @note Typescript doesn't have a thing like "Forward Declaration".
     * Thus, it's easy to get into circular dependency trouble,
     * especially while trying to export a "singleton" variable and use it everywhere. \
     * Singleton is not a good pattern but we definetly need it sometimes.
     * A way to avoid problems is to declare these variables in global scope.
     */
    var pgame: MainGame;

    /**
     * Interactions between game canvas and front-end?
     */
    var API: {
        queries: URLSearchParams;
    };
}
