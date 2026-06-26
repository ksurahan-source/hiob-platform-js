/**
 * Agent-native video platform types. 1:1 with infra/migrations/0001_agent_platform.sql.
 */

/**
 * @typedef {'script'|'voiceover'|'caption'|'visual'|'music'|'sfx'|'effect'} Track
 * @typedef {'running'|'succeeded'|'failed'|'cancelled'|'paused'} RunStatus
 * @typedef {'running'|'ok'|'error'|'cancelled'} SpanStatus
 * @typedef {'llm'|'tool'|'render'|'compute'|'human'|'retrieval'|'workflow'} SpanKind
 * @typedef {'slot'|'beat'|'track'|'run'} RegenScope
 * @typedef {'ai'|'manual'|'imported'} ArtifactSource
 * @typedef {'previous_version'|'cascade_source'|'manual_edit'|'variant_of'|'reference'} LineageRole
 * @typedef {'auto_regen'|'notify'|'manual'} CascadeRule
 * @typedef {'pending'|'processing'|'applied'|'dismissed'} AnnotationStatus
 * @typedef {'slot'|'beat'|'track'|'run'|'artifact'} AnnotationTarget
 * @typedef {'pending'|'rendering'|'ready'|'failed'} CompositionStatus
 */

/**
 * @typedef {Object} Run
 * @property {string} id
 * @property {string|null} parent_run_id
 * @property {RegenScope|null} scope
 * @property {Record<string, unknown>|null} scope_target
 * @property {string} project
 * @property {Record<string, unknown>|null} brief
 * @property {RunStatus} status
 * @property {string} started_at
 * @property {string|null} ended_at
 * @property {number} total_cost_usd
 * @property {number} total_tokens_in
 * @property {number} total_tokens_out
 * @property {Record<string, unknown>} attributes
 */

/**
 * @typedef {Object} Span
 * @property {string} id
 * @property {string} run_id
 * @property {string|null} parent_span_id
 * @property {string} name
 * @property {SpanKind} kind
 * @property {string} service
 * @property {SpanStatus} status
 * @property {string} started_at
 * @property {string|null} ended_at
 * @property {number|null} duration_ms
 * @property {string|null} idempotency_key
 * @property {string|null} target_slot_id
 * @property {string|null} input_preview
 * @property {string|null} output_preview
 * @property {Record<string, unknown>|null} error
 * @property {Record<string, unknown>} attributes
 */

/**
 * @typedef {Object} Slot
 * @property {string} id
 * @property {string} run_id
 * @property {Track} track
 * @property {number|null} beat_index
 * @property {number} start_ms
 * @property {number} end_ms
 * @property {string|null} current_artifact_id
 * @property {boolean} is_pinned
 * @property {string} created_at
 * @property {Record<string, unknown>} attributes
 */

/**
 * @typedef {Object} Artifact
 * @property {string} id
 * @property {string} run_id
 * @property {string} slot_id
 * @property {string|null} produced_by_span
 * @property {number} version
 * @property {string} variant_group_id
 * @property {ArtifactSource} source
 * @property {string} storage
 * @property {string} storage_key
 * @property {string} sha256
 * @property {string} mime
 * @property {number|null} bytes
 * @property {string|null} text_content
 * @property {number|null} duration_ms
 * @property {number|null} width
 * @property {number|null} height
 * @property {string|null} preview_text
 * @property {string|null} thumbnail_key
 * @property {string} created_at
 * @property {Record<string, unknown>} attributes
 */

/**
 * @typedef {Object} AnnotationIntent
 * @property {RegenScope} scope
 * @property {string} intent
 * @property {string[]} [direction_hints]
 * @property {string[]} [preserve]
 * @property {Record<string, unknown>} [params]
 */

/**
 * @typedef {Object} Annotation
 * @property {string} id
 * @property {string} run_id
 * @property {AnnotationTarget} target_kind
 * @property {string} target_id
 * @property {string} raw_text
 * @property {AnnotationIntent|null} intent
 * @property {AnnotationStatus} status
 * @property {string|null} resulting_run_id
 * @property {string|null} user_id
 * @property {string} created_at
 * @property {string|null} processed_at
 */

export {};
