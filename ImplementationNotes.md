Is there missing content here.

Decided 9-formating branch was better than master.
Master had NOT been commited to github, but had be sent to Heroku. Hoping that doesn't matter
https://stackoverflow.com/questions/2763006/make-the-current-git-branch-a-master-branch
(1451 people had upvoted this, so at least I'm not the first one with this issue)

From posting:
git checkout better_branch
git merge --strategy=ours master    # keep the content of this branch, but record a merge
git checkout master
git merge better_branch             # fast-forward master up to the merge

For me
git checkout 9-formatting
git merge --strategy=ours master    # keep the content of this branch, but record a merge
git checkout master
git merge 9-formatting            # fast-forward master up to the merge

I also archived the directory, just before writing this. la_hist_street.on desired 9-formatting branch.2017.06.07.zip JIC

Also checked that streets showed and that show and edit of items with and without segments worked.

On git merge --strategy=ours master, got stalled in iTerm and issued a control-C. Will try again.

Had a Guardfile in db/dumps. Deleted it. It may have been causing issues.

SourceTree was showing two uncommitted files. One was dumps and I used ignore in SourceTree to do just that and I'll add the other file to the commit. 