declare module "better-sqlite3" {
  type BindParameters = any[] | Record<string, any>;

  export interface RunResult {
    changes: number;
    lastInsertRowid: number | bigint;
  }

  export interface Statement<RunReturn = RunResult> {
    run(...params: BindParameters): RunReturn;
  }

  export interface Database {
    pragma(source: string): unknown;
    exec(source: string): this;
    prepare<RunReturn = RunResult>(sql: string): Statement<RunReturn>;
    close(): void;
  }

  export interface DatabaseConstructor {
    new (path?: string, options?: { readonly?: boolean; fileMustExist?: boolean; timeout?: number }): Database;
    (path?: string, options?: { readonly?: boolean; fileMustExist?: boolean; timeout?: number }): Database;
  }

  const Database: DatabaseConstructor;
  export default Database;
}
