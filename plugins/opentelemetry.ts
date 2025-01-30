import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { getWebAutoInstrumentations } from '@opentelemetry/auto-instrumentations-web';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { W3CTraceContextPropagator } from '@opentelemetry/core';
import { ATTR_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { Resource } from '@opentelemetry/resources';

const TRACE_URL = 'http://143.110.223.189:4318/v1/traces';

const exporter = new OTLPTraceExporter({
  url: TRACE_URL,
  headers: {},
});

const provider = new WebTracerProvider({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: 'POC-ACM',
  }),
  spanProcessors: [new SimpleSpanProcessor(exporter)],
});

provider.register({
  contextManager: new ZoneContextManager(),
  propagator: new W3CTraceContextPropagator(),
});

export class ClientTelemetry {
  private static instance: ClientTelemetry;
  private initialized = false;
  private tracer;

  private constructor() {
    this.tracer = provider.getTracer('web-service-tracer');
  }

  public static getInstance(): ClientTelemetry {
    console.log('ALLOOO');
    if (!ClientTelemetry.instance) {
      ClientTelemetry.instance = new ClientTelemetry();
    }
    return ClientTelemetry.instance;
  }

  public start(): void {
    if (!this.initialized) {
      registerInstrumentations({
        instrumentations: [
          getWebAutoInstrumentations({
            // You can configure specific instrumentations here
            '@opentelemetry/instrumentation-fetch': {
              propagateTraceHeaderCorsUrls: [
                /.+/g, // Propagate to all URLs - customize this according to your needs
              ],
            },
          }),
        ],
      });
      console.log('Client Telemetry Initialized');
      this.initialized = true;
    }
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const clientTelemetry = ClientTelemetry.getInstance();
  clientTelemetry.start();

  nuxtApp.provide('telemetry', clientTelemetry);
});
