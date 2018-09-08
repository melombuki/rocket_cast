# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_09_07_130453) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "entries", force: :cascade do |t|
    t.datetime "date_created", null: false
    t.string "guid", limit: 255, null: false
    t.datetime "last_updated", null: false
    t.bigint "podcast_id", null: false
    t.datetime "published_date"
    t.text "summary"
    t.string "title", limit: 255, null: false
    t.string "file", limit: 255, null: false
    t.index ["podcast_id"], name: "FK_d0qdpm5t36mb0n0g1hi4h3w41"
  end

  create_table "items", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
  end

  create_table "podcasts", force: :cascade do |t|
    t.string "author", limit: 255
    t.datetime "date_created", null: false
    t.text "description"
    t.string "image", limit: 255
    t.string "last_etag", limit: 255
    t.string "last_modified", limit: 255
    t.datetime "last_updated", null: false
    t.string "link", limit: 255, null: false
    t.string "subtitle", limit: 255
    t.text "summary"
    t.string "title", limit: 255, null: false
    t.string "url", limit: 255, null: false
  end

  create_table "subscriptions", force: :cascade do |t|
    t.bigint "podcast_id", null: false
    t.bigint "user_id", null: false
    t.index ["podcast_id"], name: "FK_fjpd7yil1brkt3a2820h81h95"
    t.index ["user_id"], name: "FK_tq3cq3gmsss8jjyb2l5sb1o6k"
  end

  create_table "user_sessions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "password_salt"
    t.integer "login_count", default: 0, null: false
    t.integer "failed_login_count", default: 0, null: false
    t.datetime "last_request_at"
    t.datetime "current_login_at"
    t.datetime "last_login_at"
    t.string "current_login_ip"
    t.string "last_login_ip"
    t.boolean "active", default: false
    t.boolean "approved", default: false
    t.boolean "confirmed", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
