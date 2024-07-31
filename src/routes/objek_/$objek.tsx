import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { ThumbsUp } from 'lucide-react';
import { ThumbsDown } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { SubHeader } from '@/components/SubHeader';

import { 
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  XIcon
 } from 'react-share'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogDescription
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/objek/$objek')({
  component: Objek
})

interface User {
  id: number;
  created_at: string;
  name: string;
  jenis: string;
  description: string;
  gambar1: string;
  gambar2: string;
  verified: number;
}

interface Review {
  id: number;
  user_id: number;
  reviewer_name: string;
  review: string;
  score: number;
  agree: number;
  disagree: number;
  created_at: string;
}

interface ApiResponse {
  user: User[];
  reviews: Review[];
}

export function Objek() {

  const param = Route.useParams()

  const [userData, setUserData] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const [rating, setRating] = useState(0)

  const [reviewerName, setReviewerName] = useState('');
  const [review, setReview] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchUserReviewData = async () => {
      try {
        const response = await fetch(`https://review-apa-saja.fitrah9ramadhan.workers.dev/api/users/${param.objek}/reviews`)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: ApiResponse = await response.json();
        setUserData(data.user[0]);
        setReviews(data.reviews)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchUserReviewData()
  }, [])

  useEffect(() => {
    const fetchRatingData = async () => {
      try {
        const response = await fetch(`https://review-apa-saja.fitrah9ramadhan.workers.dev/api/users/rating/${param.objek}`)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        if (data.rating == null) {
          setRating(0)
        }

        setRating(data.rating)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchRatingData()
  }, []);

  const agreeWithReview = async (reviewId: number) => {
    try {
      await fetch(`https://review-apa-saja.fitrah9ramadhan.workers.dev/api/reviews/${reviewId}/agree`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const fetchUserReviewData = async () => {
        try {
          const response = await fetch(`https://review-apa-saja.fitrah9ramadhan.workers.dev/api/users/${param.objek}/reviews`)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data: ApiResponse = await response.json();
          setUserData(data.user[0]);
          setReviews(data.reviews)

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchUserReviewData()
    } catch (err) {
      throw new Error('Failed to agree with the review');
    }
  };

  const disagreeWithReview = async (reviewId: number) => {
    try {
      await fetch(`https://review-apa-saja.fitrah9ramadhan.workers.dev/api/reviews/${reviewId}/disagree`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const fetchUserReviewData = async () => {
        try {
          const response = await fetch(`https://review-apa-saja.fitrah9ramadhan.workers.dev/api/users/${param.objek}/reviews`)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data: ApiResponse = await response.json();
          setUserData(data.user[0]);
          setReviews(data.reviews)

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchUserReviewData()

    } catch (err) {
      throw new Error('Failed to agree with the review');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const reviewData = {
      reviewer_name: reviewerName,
      review,
      score,
    };

    try {
      await fetch(`https://review-apa-saja.fitrah9ramadhan.workers.dev/api/users/${param.objek}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      const fetchUserReviewData = async () => {
        try {
          const response = await fetch(`https://review-apa-saja.fitrah9ramadhan.workers.dev/api/users/${param.objek}/reviews`)
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data: ApiResponse = await response.json();
          setUserData(data.user[0]);
          setReviews(data.reviews)

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      fetchUserReviewData()
      setReviewerName('');
      setReview('');
      setScore(0);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <>
      <div className='m-8'>
        <Link to='/main-page' className='w-fit font-semibold tracking-wide bg-amber-300 px-3 py-1 border-l-2 border-l-indigo-500 hover:border-l-black border-b-2 border-b-indigo-500 hover:border-b-black'>Kembali ke Halaman Utama</Link>
      </div>
      <div className='px-8 my-8 font-corbel flex flex-col items-center'>
        {userData && (
          <div className=''>
            <div key={userData.id} className='flex flex-col gap-4 items-center'>
              <div className='flex gap-4'>
                <h2 className='font-extrabold text-xl'>{userData.name}</h2>
                <Badge variant='outline' className='bg-slate-50 font-light'>{userData.jenis}</Badge>
              </div>
              <div className='flex'>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => {
                  return (
                    <div key={star}>
                      <span
                        className='start'
                        style={{
                          color: rating >= star ? 'gold' : 'gray',
                          fontSize: `35px`,
                        }}
                        onClick={() => {
                          setScore(star)
                        }}
                      >
                        {' '}
                        ★{' '}
                        <br />
                      </span>
                    </div>
                  )
                })}
                <p>( {!rating ? null : (rating).toFixed(2)} / 10 )</p>

              </div>
                <div className='flex justify-center gap-5'>
                  <WhatsappShareButton
                    url={`https://ulasan-liar.pages.dev/objek/${param.objek}}`}
                    title={`Ulas Apa Saja Disini!\nBerikan Ulasan Untuk:\n${userData.name}\n`}> 
                    <WhatsappIcon size={32}></WhatsappIcon>
                  </WhatsappShareButton>
                  <TwitterShareButton
                    url={`https://ulasan-liar.pages.dev/objek/${param.objek}`}
                    title={`Ulas Apa Saja Disini!\nBerikan Ulasan Untuk:\n${userData.name}\n`}>
                    <XIcon size={32}></XIcon>
                  </TwitterShareButton>
                </div>
                <br />
              <div className='flex gap-4'>
                <div className='overflow-hidden max-w-[100px] self-center'>
                  <img src="/fly.png" alt="" />
                </div>
                <div className='overflow-hidden w-[200px] max-h-[200px] bg-indigo-500 border-b-4 border-b-indigo-500 border-l-4 border-l-indigo-500 mb-4 shadow-lg'>
                  <img className='w-[200px] h-full' src={`https://pub-13068c32d5cb4eed8687217b9e9e2153.r2.dev/images/${userData.gambar1}`} alt="Gambar 1" />
                </div>
                <div className='overflow-hidden w-[200px] max-h-[200px] bg-indigo-500 border-b-4 border-b-indigo-500 border-l-4 border-l-indigo-500 mb-4 shadow-lg'>
                  <img className='w-[200px] h-full' src={`https://pub-13068c32d5cb4eed8687217b9e9e2153.r2.dev/images/${userData.gambar2}`} alt="Gambar 2" />
                </div>
                <div className='overflow-hidden max-w-[100px] self-center'>
                  <img src="/fly.png" alt="" />
                </div>
              </div>
              <div className='bg-slate-50 w-fit p-5 flex flex-col items-center border-b-4 border-b-indigo-500 border-l-4 border-l-indigo-500 mb-4 shadow-lg'>
                <p className='text-sm'>Dibuat pada: {new Date(Number(userData.created_at)).toLocaleString()}</p>
                <hr />
                <p className='pt-2'>{userData.description}</p>
              </div>
            </div>
          </div>
        )}
        <br />

        <Dialog>
          <DialogTrigger asChild className='rounded-none'>
            <button className='w-fit font-semibold tracking-wide bg-indigo-300 px-3 py-1 border-l-2 border-l-indigo-500 hover:border-l-black border-b-2 border-b-indigo-500 hover:border-b-black'>Berikan Ulasan</button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Berikan Ulasan</DialogTitle>
              <DialogDescription>Ulasan ini tidak dapat dihapus, kecuali menghubungi admin</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="gap-4 py-4">
                <div className="items-center gap-4">
                  <Label htmlFor="reviewerName" className="text-left">
                    Nama Kamu
                  </Label>
                  <Input
                    className='border-0 border-b-2 rounded-none border-b-indigo-500 w-full '
                    id="reviewerName"
                    placeholder="Nama Kamu"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                  />
                </div>
                <div className="items-center gap-4">
                  <Label htmlFor="review" className="text-left">
                    Tuliskan Ulasan
                  </Label>
                  <Textarea
                    className='border-0 border-b-2 rounded-none border-b-indigo-500 w-full'
                    id="review"
                    placeholder="..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />
                </div>
                <div className="items-center gap-4">
                  <p className="text-left">
                    Berikan Score
                  </p>
                  <div className='flex'>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => {
                      return (

                        <div key={star}>
                          <span
                            style={{
                              cursor: 'pointer',
                              color: score >= star ? 'gold' : 'gray',
                              fontSize: `35px`,
                            }}
                            onClick={() => {
                              setScore(star)
                            }}
                          >
                            {' '}
                            ★{' '}
                            <br />
                          </span>
                        </div>

                      )
                    })}
                  </div>
                  <br />
                </div>
                <DialogFooter>
                  <p>{score}/10</p>
                  <DialogClose asChild>
                    <button
                      className='w-fit font-semibold tracking-wide bg-indigo-300 px-3 py-1 border-l-2 border-l-indigo-500 hover:border-l-black border-b-2 border-b-indigo-500 hover:border-b-black'
                      type="submit">Submit</button>
                  </DialogClose>
                </DialogFooter>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <br />

        <SubHeader title='Ulasan - Ulasan'></SubHeader>
        <br />
        <div className='gap-5 flex flex-row justify-center'>
          {reviews.map((review) => (
            <div key={review.id} className='bg-indigo-200 w-full p-3 border-b-4 border-b-indigo-500 hover:border-b-black border-l-4 border-l-indigo-500 hover:border-l-black align-top h-auto mb-2 flex flex-col justify-between gap-1 shadow-xl'>
              <div>
                <h3 className='font-bold text-lg'>From: {review.reviewer_name}</h3>
                <p className='font-light text-sm'>{new Date(Number(review.created_at)).toLocaleString()}</p>
                <hr />
              </div>
              <div>
                <p className='italic'>{review.review}</p>
                <div className='flex gap-0'>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => {
                    return (
                      <div key={star}>
                        <span
                          className='start'
                          style={{
                            color: review.score >= star ? 'orange' : 'gray',
                            fontSize: `18px`,
                          }}
                          onClick={() => {
                            setScore(star)
                          }}
                        >
                          {' '}
                          ★{' '}
                          <br />
                        </span>
                      </div>
                    )
                  })}
                  <p>( {!review.score ? null : (review.score).toFixed(2)} / 10 )</p>

                </div>
              </div>
              <div className='flex gap-4'>
                <button onClick={() => agreeWithReview(review.id)} className='border-b-2 border-b-indigo-500 hover:border-b-black border-l-2 border-l-indigo-500 hover:border-l-black flex gap-2 px-2 py-1 bg-amber-300 text-xs items-center font-semibold'>
                  <ThumbsUp /><p>{review.agree} Setuju</p>
                </button>
                <button onClick={() => disagreeWithReview(review.id)} className='border-b-2 border-b-indigo-500 hover:border-b-black border-l-2 border-l-indigo-500 hover:border-l-black flex gap-2 px-2 py-1 bg-amber-300 text-xs items-center font-semibold'>
                  <ThumbsDown /><p>{review.disagree} Tidak Setuju</p>
                </button>
              </div>
            </div>
          ))}

        </div>

      </div>
    </>
  )

}