import { matchRoutes } from 'react-router';
import { initializeFaro, createReactRouterV7DataOptions, ReactIntegration, getWebInstrumentations, WebVitalsInstrumentation } from '@grafana/faro-react';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

export function init() {
    initializeFaro({
        url: 'https://faro-collector-prod-eu-west-2.grafana.net/collect/17f63a69a2cba6c5378559a5b56926ef',
        app: {
            name: 'msk portfolio',
            version: '1.0.0',
            environment: 'production'
        },

        instrumentations: [
            // Mandatory, omits default instrumentations otherwise.
            ...getWebInstrumentations(),

            // Tracing package to get end-to-end visibility for HTTP requests.
            new TracingInstrumentation(),

            new WebVitalsInstrumentation(),

            // React integration for React applications.
            new ReactIntegration({
                router: createReactRouterV7DataOptions({
                    matchRoutes,
                }),
            }),
        ],
    })
}