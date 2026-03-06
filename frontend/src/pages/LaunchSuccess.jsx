import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

import { FiDownload } from 'react-icons/fi'
import { FaWhatsapp, FaLinkedin, FaShareAlt } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import FooterLine from '../assets/FooterLine.svg'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString()

const LaunchSuccess = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [loading, setLoading] = useState(true)
  const [pdfUrl, setPdfUrl] = useState(null)
  const [error, setError] = useState(null)
  const [pdfWidth, setPdfWidth] = useState(750)
  const pdfWrapperRef = useRef(null)

  const updatePdfWidth = () => {
    const wrapperWidth = pdfWrapperRef.current?.clientWidth

    if (!wrapperWidth) {
      setPdfWidth(750)
      return
    }

    const nextWidth = Math.max(240, Math.min(750, wrapperWidth - 16))
    setPdfWidth(nextWidth)
  }

  useEffect(() => {
    updatePdfWidth()
    window.addEventListener('resize', updatePdfWidth)

    return () => window.removeEventListener('resize', updatePdfWidth)
  }, [])

  useEffect(() => {
    if (!pdfUrl) return

    const rafId = window.requestAnimationFrame(updatePdfWidth)
    return () => window.cancelAnimationFrame(rafId)
  }, [pdfUrl])

  useEffect(() => {
    if (!sessionId) {
      setError('Invalid payment session.')
      setLoading(false)
      return
    }

    const fetchTicket = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/checkout/session/${sessionId}`
        )

        if (!res.data || res.data.status !== 'paid') {
          setError('Payment not confirmed.')
          return
        }

        setPdfUrl(res.data.pdfUrl)
        localStorage.removeItem('launchPassData')
      } catch (err) {
        setError('Unable to fetch ticket.')
      } finally {
        setLoading(false)
      }
    }

    fetchTicket()
  }, [sessionId])

  const shareText = 'I just got my Launch Pass 🚀'

  const whatsappShare = pdfUrl
    ? `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + pdfUrl)}`
    : ''

  const twitterShare = pdfUrl
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pdfUrl)}`
    : ''

  const linkedinShare = pdfUrl
    ? `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(shareText + ' ' + pdfUrl)}`
    : ''

  const copyLink = () => {
    if (pdfUrl) {
      navigator.clipboard.writeText(pdfUrl)
      alert('Link copied to clipboard!')
    }
  }

  const downloadPdf = async () => {
    try {
      const response = await fetch(pdfUrl)

      if (!response.ok) {
        throw new Error('Failed to download PDF')
      }

      const blob = await response.blob()

      const file = new File([blob], 'LaunchPass.pdf', {
        type: 'application/pdf'
      })

      const url = window.URL.createObjectURL(file)

      const link = document.createElement('a')
      link.href = url
      link.download = file.name

      document.body.appendChild(link)
      link.click()

      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Download failed:', err)
      alert('Unable to download ticket.')
    }
  }

  return (
    <div className='w-full min-h-screen bg-black'>
      <Navbar />

      <div className='pt-18'>
        <div className="w-full min-h-screen bg-[url('https://res.cloudinary.com/dc7bb6868/image/upload/v1772797323/Gemini_Generated_Image_efw7ybefw7ybefw7_1_fr4nfs.png')] bg-cover bg-top px-4 sm:px-8 lg:px-0 md:bg-[url('./assets/LaunchSuccessbg.png')] md:bg-center">
          <div className='mx-auto flex w-full max-w-[1200px] flex-col items-center pb-12 pt-10 sm:pt-16 md:gap-6 md:pt-24 lg:items-end lg:pt-32'>
            <div className='w-full text-center md:text-left lg:pr-30'>
              <span className='block text-white text-3xl sm:text-5xl lg:text-7xl font-extralight font-aspekta leading-tight'>
                Launch Pass
              </span>

              <span className='block text-white text-3xl sm:text-5xl lg:text-7xl font-extralight font-aspekta leading-tight'>
                Generated Yayyy....
              </span>
            </div>

            <div className='mt-[22vh] w-full flex flex-col items-center gap-3 md:mt-0 lg:items-end lg:pr-50'>
              {loading && (
                <div className='text-white text-center text-lg sm:text-xl'>
                  Verifying payment & loading ticket...
                </div>
              )}

              {!loading && error && (
                <div className='text-center text-red-500 text-lg sm:text-xl'>
                  {error}
                </div>
              )}

              {!loading && pdfUrl && !error && (
                <>
                  <div
                    ref={pdfWrapperRef}
                    className='w-full max-w-full overflow-x-auto rounded-md border border-white/20 bg-black/70 p-2 sm:p-3 backdrop-blur-[2px]'
                  >
                    <Document
                      file={pdfUrl}
                      loading={
                        <p className='py-8 text-center text-white/80'>
                          Loading ticket preview...
                        </p>
                      }
                      error={
                        <p className='py-8 text-center text-red-400'>
                          Unable to preview ticket PDF.
                        </p>
                      }
                    >
                      <Page
                        pageNumber={1}
                        width={pdfWidth}
                        renderAnnotationLayer={false}
                        renderTextLayer={false}
                      />
                    </Document>
                  </div>

                  <div className='flex flex-wrap items-center justify-center gap-5 text-base lg:justify-end'>
                    <button
                      onClick={downloadPdf}
                      className='text-white hover:text-gray-300 transition'
                      title='Download Ticket'
                    >
                      <FiDownload />
                    </button>

                    <a
                      href={whatsappShare}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-green-500 hover:text-green-400 transition'
                      title='Share on WhatsApp'
                    >
                      <FaWhatsapp />
                    </a>

                    <a
                      href={linkedinShare}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 hover:text-blue-500 transition'
                      title='Share on LinkedIn'
                    >
                      <FaLinkedin />
                    </a>

                    <a
                      href={twitterShare}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-sky-500 hover:text-sky-400 transition'
                      title='Share on X'
                    >
                      <FaXTwitter />
                    </a>

                    <button
                      onClick={copyLink}
                      className='text-red-500 hover:text-red-400 transition'
                      title='Copy Share Link'
                    >
                      <FaShareAlt />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <img src={FooterLine} alt='FooterLine' className='w-full' />
      <Footer />
    </div>
  )
}

export default LaunchSuccess
