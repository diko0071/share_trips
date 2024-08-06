'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
    

export default function EmailConfirmationSend() {

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Email Confirmation Sent</CardTitle>
          <CardDescription>We've sent you an email confirmation. Please check your inbox.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={() => window.open('https://mail.google.com', '_blank')}>
                Gmail
              </Button>
              <Button variant="outline" onClick={() => window.open('https://outlook.live.com', '_blank')}>
                Outlook
              </Button>
              <Button variant="outline" onClick={() => window.open('https://mail.yandex.com', '_blank')}>
                Yandex
              </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}