import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'

describe('Test render main', () => {
  it('Test component main', () => {
    render(<App />)
    const mainHeader = screen.getByRole('heading', {
      name: /Benvenuti in Epibooks!/i,
    })
    expect(mainHeader).toBeInTheDocument()
  })

  it('Render di tutti i libri', () => {
    render(<App />)
    const allTheBookCards = screen.getAllByTestId('book-card')
    expect(allTheBookCards).toHaveLength(150)
  })

  it('Render component CommentArea', () => {
    render(<App />)
    const reviewInputField = screen.getByPlaceholderText(
      /Inserisci qui il testo/i
    )
    expect(reviewInputField).toBeInTheDocument()
  })
})

describe('Test Filter', () => {
  it("Trova un solo elemento con la parola arrow", () => {
    render(<App />)
    const filterInputField = screen.getByPlaceholderText(/Cerca un libro/i)
    fireEvent.change(filterInputField, { target: { value: 'arrows' } })
    const allTheBookCards = screen.getAllByTestId('book-card')
    expect(allTheBookCards).toHaveLength(1)
  })

  it("Trova 3 elementi con la parola witcher", () => {
    render(<App />)
    const filterInputField = screen.getByPlaceholderText(/Cerca un libro/i)
    fireEvent.change(filterInputField, { target: { value: 'witcher' } })
    const allTheBookCards = screen.getAllByTestId('book-card')
    expect(allTheBookCards).toHaveLength(3)
  })
})

describe('Test Component SingleBook', () => {
  it('clickare il libro cambia il border in colorato', () => {
    render(<App />)
    const allTheBookCards = screen.getAllByTestId('book-card')
    const firstBookCard = allTheBookCards[0]
    fireEvent.click(firstBookCard)
    expect(firstBookCard).toHaveStyle('border: 3px solid red')
  })

  it('riclickando il libro resetta il border al precedente', () => {
    render(<App />)
    const allTheBookCards = screen.getAllByTestId('book-card')
    const firstBookCard = allTheBookCards[0]
    fireEvent.click(firstBookCard)
    expect(firstBookCard).toHaveStyle('border: 3px solid red')
    const secondBookCard = allTheBookCards[1]
    fireEvent.click(secondBookCard)
    expect(firstBookCard).not.toHaveStyle('border: 3px solid red')
  })
})

describe('Test CommentList', () => {
  it('Non carica commenti al load del componente', () => {
    render(<App />)
    const allTheBookComments = screen.queryAllByTestId('single-comment')
    expect(allTheBookComments).toHaveLength(0)
  })

  it('Carica i commenti al click del libro', async () => {
    render(<App />)
    const allTheBookCards = screen.getAllByTestId('book-card')
    const firstBookCard = allTheBookCards[0]
    fireEvent.click(firstBookCard)
    const allTheBookComments = await screen.findAllByTestId('single-comment')
    expect(allTheBookComments).not.toHaveLength(0)
  })
})
