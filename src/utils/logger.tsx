class Log {
    
    private static title;
    private static group = 'default';
    
    log = ( group: string = "default" ): ILog => {
        
        return {
            info: ( message: string, objects: undefined | {} | {}[] = undefined,
                    title: string = undefined, ) => {
                this.callLogType( message, group, this.info, title, objects );
                
            },
            
            log: ( message: string, objects: undefined | {} | {}[] = undefined,
                   title: string = undefined, ) => {
                this.callLogType( message, group, this.consoleLog, title,
                    objects );
                
            },
            
            error: ( message: string,
                     objects: undefined | {} | {}[] = undefined,
                     title: string = undefined, ) => {
                this.callLogType( message, group, this.error, title, objects );
                
            },
            
            warn: ( message: string, objects: undefined | {} | {}[] = undefined,
                    title: string = undefined, ) => {
                this.callLogType( message, group, this.warn, title, objects );
            },
            
        };
        
    };
    
    callLogType = ( message: string, group: string, logFunction: Function,
                    title: string | null = null,
                    objects: null | {} | {}[] = null, ) => {
        
        if ( logFunction === this.consoleLog || logFunction === this.info &&
            process.env.NODE_ENV !== "development" ) {
            return;
        }
        
        if ( group !== Log.group ) {
            this.endGroup();
            Log.group = group;
            this.group();
        }
        
        if ( title ) {
            Log.title = title;
        }
        
        logFunction( message );
        if ( objects ) {
            this.logObjects( objects );
        }
    };
    
    group = () => {
        console.group( '%c' + Log.group,
            "padding: 2px 10px; border-bottom: 1px solid orange; font-size:" +
            " 18px" );
    };
    
    endGroup = () => {
        console.groupEnd();
    };
    
    info = ( arg: string ) => {
        if ( Log.title ) {
            arg = Log.title + ": " + arg;
        }
        console.info( '%c' + arg, "background-color: #bdcff3; color: black;" +
            "padding: 2px 10px; border-radius: 3px" );
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
    };
    
    logObjects = ( objects: {} | {}[] ) => {
        if ( Array.isArray( objects ) ) {
            objects.forEach( object => {
                this.logObject( object );
            } )
        } else {
            this.logObject( objects );
        }
    };
    
    logObject = ( object: {} ) => {
        if ( Log.title ) {
            console.log( "%c" + Log.title, "background-color:" +
                " #e4efb0; margin-left: 2rem; color: black; border-radius:" +
                " 3px; padding: 2px 10px", object );
        } else {
            console.log( "%c" + object, "background-color:" +
                " #e4efb0" );
        }
    }
}

interface ILog {
    info: ( message: string, objects?: null | {} | {}[],
            title?: string ) => void;
    error: ( message: string, objects?: null | {} | {}[],
             title?: string ) => void;
    log: ( message: string, objects?: null | {} | {}[],
           title?: string ) => void;
    warn: ( message: string, objects?: null | {} | {}[],
            title?: string ) => void;
}

const Logger = new Log();

export default Logger.log;

