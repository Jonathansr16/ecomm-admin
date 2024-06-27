export interface Metrics {
    title: string;
    metrics: Metric[] 
  }
  
  export interface Metric {
    channel: 'mely' | 'claroshop' | 'amazon' | 'walmart' | 'woocommerce'
    label: string;
    value: number;
    status: 'loading' | 'success' | 'empty' | 'error'
  }