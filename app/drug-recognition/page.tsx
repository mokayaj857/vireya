"use client"

import React, { useCallback, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { drugRecognizeUpload } from "@/lib/api"

export default function DrugRecognitionPage() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const onSelectFile = useCallback((f: File | null) => {
    setError(null)
    setResult(null)
    setFile(f)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(f ? URL.createObjectURL(f) : null)
  }, [previewUrl])

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null
    onSelectFile(f)
  }, [onSelectFile])

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const f = e.dataTransfer.files?.[0] || null
    if (f) onSelectFile(f)
  }, [onSelectFile])

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  const canSubmit = useMemo(() => !!file && !loading, [file, loading])

  const submit = useCallback(async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const json = await drugRecognizeUpload(file)
      setResult(json)
    } catch (e: any) {
      setError(e?.message || "Upload failed")
    } finally {
      setLoading(false)
    }
  }, [file])

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-3xl font-semibold tracking-tight">Drug Recognition</h1>
      <p className="mt-2 text-sm text-muted-foreground">Upload a photo of a pill or packaging to detect the drug.</p>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            className="relative flex h-64 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-muted-foreground/30 bg-muted/30 p-4 text-center"
            onClick={() => inputRef.current?.click()}
          >
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="space-y-2">
                <div className="text-sm font-medium">Drag & drop image here</div>
                <div className="text-xs text-muted-foreground">or click to select a file (PNG, JPG)</div>
              </div>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onInputChange}
            />
          </div>

          <div className="mt-4 flex gap-2">
            <Button variant="secondary" onClick={() => onSelectFile(null)} disabled={!file || loading}>Clear</Button>
            <Button onClick={submit} disabled={!canSubmit}>
              {loading ? "Recognizing..." : "Recognize"}
            </Button>
          </div>

          {error && (
            <div className="mt-3 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}
        </div>

        <div>
          <div className="rounded-lg border p-4">
            <div className="mb-2 text-sm font-medium">Result</div>
            {result ? (
              <pre className="max-h-[420px] overflow-auto whitespace-pre-wrap break-words text-xs">
                {JSON.stringify(result, null, 2)}
              </pre>
            ) : (
              <div className="text-sm text-muted-foreground">No result yet. Upload an image and click Recognize.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
