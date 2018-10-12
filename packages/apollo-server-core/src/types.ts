import { GraphQLSchema, DocumentNode } from 'graphql';
import { SchemaDirectiveVisitor, IResolvers, IMocks } from 'graphql-tools';
import { ConnectionContext } from 'subscriptions-transport-ws';
import WebSocket from 'ws';
import { GraphQLExtension } from 'graphql-extensions';
export { GraphQLExtension } from 'graphql-extensions';

import { EngineReportingOptions } from 'apollo-engine-reporting';

import { PlaygroundConfig } from './playground';
export { PlaygroundConfig, PlaygroundRenderPageOptions } from './playground';

import {
  GraphQLServerOptions as GraphQLOptions,
  PersistedQueryOptions,
} from './graphqlOptions';
import { CacheControlExtensionOptions } from 'apollo-cache-control';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';

export { KeyValueCache } from 'apollo-server-caching';

export type Context<T = any> = T;
export type ContextFunction<T = any> = (
  context: Context<T>,
) => Promise<Context<T>>;

type ValueOrPromise<T> = T | Promise<T>;

export type ServerOptionsFunction<HandlerArguments extends any[]> = (
  ...args: HandlerArguments
) => ValueOrPromise<GraphQLOptions>;

export interface SubscriptionServerOptions {
  path: string;
  keepAlive?: number;
  onConnect?: (
    connectionParams: Object,
    websocket: WebSocket,
    context: ConnectionContext,
  ) => any;
  onDisconnect?: (websocket: WebSocket, context: ConnectionContext) => any;
}

// This configuration is shared between all integrations and should include
// fields that are not specific to a single integration
export interface Config
  extends Pick<
      GraphQLOptions<Context<any>>,
      | 'formatError'
      | 'debug'
      | 'rootValue'
      | 'validationRules'
      | 'formatResponse'
      | 'fieldResolver'
      | 'tracing'
      | 'dataSources'
      | 'cache'
    > {
  typeDefs?: DocumentNode | Array<DocumentNode>;
  resolvers?: IResolvers;
  schema?: GraphQLSchema;
  schemaDirectives?: Record<string, typeof SchemaDirectiveVisitor>;
  context?: Context<any> | ContextFunction<any>;
  introspection?: boolean;
  mocks?: boolean | IMocks;
  mockEntireSchema?: boolean;
  engine?: boolean | EngineReportingOptions;
  extensions?: Array<() => GraphQLExtension>;
  cacheControl?: CacheControlExtensionOptions | boolean;
  plugins?: PluginDefinition[];
  persistedQueries?: PersistedQueryOptions | false;
  subscriptions?: Partial<SubscriptionServerOptions> | string | false;
  //https://github.com/jaydenseric/apollo-upload-server#options
  uploads?: boolean | FileUploadOptions;
  playground?: PlaygroundConfig;
}

export type PluginDefinition =
  | ApolloServerPlugin
  | (new () => ApolloServerPlugin);

export interface FileUploadOptions {
  //Max allowed non-file multipart form field size in bytes; enough for your queries (default: 1 MB).
  maxFieldSize?: number;
  //Max allowed file size in bytes (default: Infinity).
  maxFileSize?: number;
  //Max allowed number of files (default: Infinity).
  maxFiles?: number;
}
