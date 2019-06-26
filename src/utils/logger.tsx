class Log {
    
    private static title;
    private static group = 'default';
    private static styles = {};
    
    constructor() {
        Log.styles = defaultStyles;
    }
    
    log = ( group: string = "default" ): ILog => {
        
        return {
            info: ( message: string, objects: undefined | {} | {}[] = undefined,
                    title: string = undefined, ): void => {
                this.callLogType( message, group, this.info, title, objects,
                    "info" );
                
            },
            
            log: ( message: string, objects: undefined | {} | {}[] = undefined,
                   title: string = undefined, ): void => {
                this.callLogType( message, group, this.consoleLog, title,
                    objects, "log" );
                
            },
            
            error: ( message: string,
                     objects: undefined | {} | {}[] = undefined,
                     title: string = undefined, ): void => {
                this.callLogType( message, group, this.error, title, objects,
                    "error" );
                
            },
            
            warn: ( message: string, objects: undefined | {} | {}[] = undefined,
                    title: string = undefined, ): void => {
                this.callLogType( message, group, this.warn, title, objects,
                    "warn" );
            },
            
            setStyle: (styleType: styleTypes, styles: string): void => {
                Log.styles[styleType] = styles;
            }
            
        };
        
    };
    
    callLogType = ( message: string, group: string, logFunction: Function,
                    title: string | null = null,
                    objects: null | {} | {}[] = null, functType: funcType ) => {
        
        if ( ( logFunction === this.consoleLog || logFunction === this.info ) &&
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
            this.logObjects( objects, functType );
        }
    };
    
    group = () => {
        console.group( '%c' + Log.group,
          Log.styles['group']  );
    };
    
    endGroup = () => {
        console.groupEnd();
    };
    
    info = ( arg: string ) => {
        if ( Log.title ) {
            arg = Log.title + ": " + arg;
        }
        console.info( '%c' + arg, Log.styles[ 'info' ] );
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
        console.log( arg, Log.styles['log'] );
    };
    
    logObjects = ( objects: {} | {}[], functType: funcType ) => {
        if ( Array.isArray( objects ) ) {
            objects.forEach( object => {
                this.logObject( object, functType );
            } )
        } else {
            this.logObject( objects, functType );
        }
    };
    
    logObject = ( object: {}, funcType: funcType ) => {
        if ( Log.title ) {
            console.log( "%c" + Log.title, Log.styles[ funcType ], object );
        } else {
            console.log( object );
        }
    }
}

const defaultStyles: styles = {
    info: "background-color: #bdcff3; color: black; padding: 2px 10px;" +
        " border-radius: 3px",
    log: "padding: 2px 10px; border-radius: 3px",
    warn: "background-color: #f8ffa9; color: black; padding: 2px 10px;" +
        " border-radius: 3px",
    error: "background-color: #ff9d9d; color: black; padding: 2px 10px;" +
        " border-radius: 3px",
    group: "padding: 2px 10px; border-bottom: 1px solid orange; font-size:" +
        " 18px"
};

type styleTypes = "info" | "warn" | "error" | "log" | "group";

type styles = {
    [id in styleTypes]: string;
};

interface ILog {
    info: ( message: string, objects?: null | {} | {}[],
            title?: string ) => void;
    error: ( message: string, objects?: null | {} | {}[],
             title?: string ) => void;
    log: ( message: string, objects?: null | {} | {}[],
           title?: string ) => void;
    warn: ( message: string, objects?: null | {} | {}[],
            title?: string ) => void;
    setStyle: (styleType: styleTypes, styles: string) => void;
}

type funcType = "info" | "warn" | 'error' | "log";

const Logger = new Log();

export default Logger.log;

