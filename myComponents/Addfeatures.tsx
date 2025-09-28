import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BookOpen, FileText } from 'lucide-react';
import Image from "next/image";
import Link from 'next/link';

function Addfeatures() {
  return (
    <div className="w-full max-w-7xl mx-auto p-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 flex flex-col lg:flex-row bg-violet-100 rounded-2xl shadow-lg overflow-hidden">
          <div className="lg:w-full p-8 flex flex-col justify-center">
            <h1 className="text-5xl font-outfitRegular font-extrabold text-slate-600 leading-tight mb-6">
              Join a Supportive Community
            </h1>
            <h2 className="text-4xl font-outfitRegular font-semibold text-slate-800 mb-6">
              Connect, Share, and Grow Together
            </h2>
            <p className="text-slate-600 font-outfitRegular leading-relaxed mb-6 text-xl">
              Discover a safe space to connect with like-minded individuals. Share
              your experiences and grow through shared journeys and resources.
            </p>
            <Link href='/community'>
            <Button className="w-fit bg-violet-600 hover:bg-violet-700 text-white rounded-full">
              Join Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            </Link>
          </div>
        
        </div>
        <div className="lg:w-1/3 flex flex-col gap-8">
          <Card className="bg-blue-50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-outfitRegular font-semibold text-blue-800">Mood Track</h3>
              </div>
              <p className="text-blue-600 font-outfitRegular mb-4">
              Monitor your emotions and gain insights into your mental well-being over time.
              </p>
              <Link href='/Input1'>
              <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0">
              Track Your Mood <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-pink-50 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-pink-100 p-3 rounded-full mr-4">
                  <BookOpen className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-outfitRegular font-semibold text-pink-800">Journals</h3>
              </div>
              <p className="text-pink-600 font-outfitRegular mb-4">
                Document your journey and reflect on your personal growth.
              </p>
              <Link href='/journel'>
              <Button variant="link" className="text-pink-600 hover:text-pink-700 p-0">
                Start Journaling <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Addfeatures;

