rem DISTRIBUTION SCRIPT EXECUTED ON THE BUILD SERVER
if exist lib-dist rd lib-dist /s /q
git clone --depth=1 "https://OAuth:%SYSTEM_ACCESSTOKEN%@youforce.visualstudio.com/DefaultCollection/UI%%20Library/_git/raet-ui" lib-dist
robocopy lib-dist\.git lib-dist.git /move /e
robocopy dist lib-dist /mir
robocopy lib-dist.git lib-dist\.git /move /e
pushd lib-dist
call npm --no-git-tag-version --force version %BUILD_BUILDNUMBER%
git add *
git commit -m "Update %BUILD_BUILDNUMBER%"
call ..\node_modules\.bin\bower version %BUILD_BUILDNUMBER% -m "Bower update %BUILD_BUILDNUMBER%"
git push
git push --tags
popd
rd lib-dist /s /q