<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CommentController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Comments', [
            'comments' => Comment::with('user')->orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function toggleApprove(Comment $comment)
    {
        $comment->is_approved = !$comment->is_approved;
        $comment->save();

        $statusText = $comment->is_approved ? 'approved' : 'unapproved';
        return redirect()->back()->with('success', "Comment status has been set to {$statusText}.");
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();
        return redirect()->back()->with('success', 'Comment deleted successfully.');
    }
}
