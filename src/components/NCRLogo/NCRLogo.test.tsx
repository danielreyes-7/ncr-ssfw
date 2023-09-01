import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { toHaveNoViolations, axe } from 'jest-axe'

import { NCRLogo } from '.'

expect.extend(toHaveNoViolations)

describe('NCRLogo test', () => {
  test('should render without crashes', (): void => {
    render(<NCRLogo />)
  })

  test('should render without accesibility violations', async (): Promise<void> => {
    const { container } = render(<NCRLogo />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})

