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
            console.log( Log.title, object );
        } else {
            console.log( object );
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

