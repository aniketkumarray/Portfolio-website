import { describe, expect, it } from 'vitest'
import { clamp, cn, isValidEmail, lerp, pad, range } from './utils'

describe('utils', () => {
  it('cn joins truthy classes', () => {
    expect(cn('a', false, undefined, 'b', null)).toBe('a b')
  })
  it('clamp bounds values', () => {
    expect(clamp(5, 0, 3)).toBe(3)
    expect(clamp(-1, 0, 3)).toBe(0)
  })
  it('lerp interpolates', () => {
    expect(lerp(0, 10, 0.5)).toBe(5)
  })
  it('range maps progress windows', () => {
    expect(range(0.5, 0, 1)).toBe(0.5)
    expect(range(0.2, 0.4, 0.6)).toBe(0)
    expect(range(0.7, 0.4, 0.6)).toBe(1)
  })
  it('pad formats indices', () => {
    expect(pad(3)).toBe('03')
    expect(pad(12, 4)).toBe('0012')
  })
  it('validates emails', () => {
    expect(isValidEmail('a@b.co')).toBe(true)
    expect(isValidEmail('nope')).toBe(false)
  })
})
