class Log {
    
    private static title;
    private static group = 'default';
    
    log = ( message, objects = null, type = 'log', group = "default",
            title = null, ) => {
        
        if ( type === 'log' || type === "info" || type === "debug" ) {
            if ( process.env.NODE_ENV !== "development" ) {
                return;
            }
        }
        
        if ( Log.title !== title ) {
            Log.title = title;
        }
        
        if ( Log.group !== group ) {
            if ( Log.group !== 'default' ) {
                this.endGroup();
            }
            Log.group = group;
            if ( Log.group !== "default" ) {
                this.group();
            }
        }
        
        if ( type === "warn" ) {
            this.warn( message );
        } else if ( type === "error" ) {
            this.error( message );
        } else if ( type === "info" ) {
            this.info( message );
        } else if ( type === "log" ) {
            this.consoleLog( message );
        }
        
        if ( objects ) {
            if ( Array.isArray( objects ) ) {
                objects.forEach( obj => {
                    this.consoleLog( obj );
                } )
            } else {
                this.consoleLog( objects );
            }
        }
        
    };
    
    group = () => {
        console.group( Log.group );
    };
    
    endGroup = () => {
        console.groupEnd();
    };
    
    info = ( arg: string ) => {
        if ( Log.title ) {
            arg = Log.title + ": " + arg;
        }
        console.info( arg );
    };
    
    error = ( arg: string ) => {
        if ( Log.title ) {
            arg = Log.title + ": " + arg;
        }
        console.error( arg );
    };
    
    warn = ( arg: string ) => {
        if ( Log.title ) {
            arg = Log.title + ": " + arg;
        }
        console.warn( arg );
    };
    
    consoleLog = ( arg: string ) => {
        if ( Log.title ) {
            arg = Log.title + ": " + arg;
        }
        console.log( arg );
    }
}

interface ILog {
    type: string;
    message: string;
    objects?: any;
    group?: string;
    title?: null | string;
}

const Logger = new Log();

export default Logger.log;

