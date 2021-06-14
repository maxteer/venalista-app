package com.venalista.modules

import android.content.Intent
import android.net.Uri
import android.os.Build
import androidx.core.content.FileProvider
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.venalista.BuildConfig
import okhttp3.*
import okhttp3.Callback
import okio.Okio
import java.io.File
import java.io.IOException
import kotlin.math.roundToInt

@Suppress("unused")
class UpdaterModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String = "UpdaterManager"

  @ReactMethod
  fun downloadUpdate(downloadUrl: String, promise: Promise) {
    val file = File(reactContext.getExternalFilesDir(null), "update.apk")
    val request = Request.Builder().url(downloadUrl).build()
    val callback: Callback = object : Callback {
      override fun onFailure(call: Call, ex: IOException) {
        promise.resolve(JSApplicationCausedNativeException("Could not download update from '" + downloadUrl + "': " + ex.message))
      }

      @Throws(IOException::class)
      override fun onResponse(call: Call, response: Response) {
        if (!response.isSuccessful) {
          promise.resolve(JSApplicationCausedNativeException("Could not download update from '" + downloadUrl + "': Code " + response.code()))
          return
        }

        try {
          response.body()!!.use { body ->
            val source = body.source()
            val sink = Okio.buffer(Okio.sink(file))

            val contentLength = body.contentLength()

            val data = ByteArray(8 * 1024)
            var total: Long = 0
            var count: Int

            var lastProgressValue = 0

            while (source.read(data).also { count = it } != -1) {
              total += count

              val progress = (total.toDouble() * 100 / contentLength).roundToInt().toDouble()
              if (progress != lastProgressValue.toDouble() || total == contentLength) {
                lastProgressValue = progress.toInt()
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java).emit("UPDATE_DOWNLOAD_PROGRESS", (total * 100.0) / contentLength)
              }

              sink.write(data, 0, count)
            }

            sink.flush()
            sink.close()
            source.close()
            promise.resolve(true)
          }
        } catch (ex: Exception) {
          promise.resolve(JSApplicationCausedNativeException("Could not download update from '" + downloadUrl + "': " + ex.message))
        }
      }
    }

    OkHttpClient()
            .newCall(request)
            .enqueue(callback)
  }

  @ReactMethod
  fun installUpdate(promise: Promise) {
    val fileName = "update.apk"
    val mimeType = "application/vnd.android.package-archive"
    val file = File(reactContext.getExternalFilesDir(null), fileName)
    var uri = Uri.fromFile(file)
    if (Build.VERSION.SDK_INT > Build.VERSION_CODES.M) {
      uri = FileProvider.getUriForFile(reactContext, BuildConfig.APPLICATION_ID + ".fileProvider", file)
    }
    try {
      val intent = Intent(Intent.ACTION_VIEW)
        .setDataAndType(uri, mimeType)
      intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_GRANT_READ_URI_PERMISSION
      reactContext.startActivity(intent)
      promise.resolve(true)
    } catch (ex: Exception) {
      promise.reject(JSApplicationIllegalArgumentException("Could not open file '" + uri + "': " + ex.message))
    }
  }
}