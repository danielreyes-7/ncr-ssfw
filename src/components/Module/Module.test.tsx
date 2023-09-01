import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { toHaveNoViolations, axe } from 'jest-axe'

import { Module } from '.'

expect.extend(toHaveNoViolations)

describe('Module test', () => {
  test('should render without crashes', (): void => {
    render(
      <Module
        accountNumber={156151}
        accountType='CC'
        id={2}
        navigate={() => ''}
      />
    )
    expect(screen.getByText(/Cuenta Corriente/)).toBeDefined()
  })

  test('should be in screen', (): void => {
    render(
      <Module
        accountNumber={'156154'}
        accountType='CC'
        id={1}
        navigate={() => ''}
      />
    )
    expect(screen.getByTestId('moduleTestid-1'))

    const accountNumber = screen.getByText(/Nro: 156151/)
    expect(accountNumber).toBeDefined()
  })

  test('should render without accesibility violations', async () => {
    const { container } = render(
      <Module
        accountNumber={156152}
        accountType='CC'
        id={3}
        navigate={() => ''}
      />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
